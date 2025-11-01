
import { getDB } from '../../db/connection';
import { IRating, IRatingResponse } from '../models/Rating';


export class RatingService {
  private ratingCollection = () => getDB().collection<IRating>('ratings')


  async getAllRatings(): Promise<IRatingResponse[]> {
    try {
    const ratings = await this.ratingCollection().find().toArray();
    return ratings?.map(rating => this.formatRatingResponse(rating)) || [];
    } catch (error) {
        throw new Error('Erreur lors de la récupération des ratings');
    }
  }

  async getRatingById(ratingId: string): Promise<IRatingResponse | undefined> {
    try {
    return this.getAllRatings().then(ratings => ratings.find(rating => ratingId === rating.id));
    } catch (error) {
        throw new Error('Erreur lors de la récupération du rating par ID');
    }
  }

  async createRating(ratingData: IRating): Promise<IRatingResponse> {
    try {
    const ratingCount = await this.ratingCollection().countDocuments();
    const newRating: IRating = {
      ...ratingData,
      id: (ratingCount + 1).toString()
    }
    await this.ratingCollection().insertOne(newRating);
    return this.formatRatingResponse(newRating);
    } catch (error) {
        throw new Error('Erreur lors de la création du rating');
    }
  }

  async getMovieAverage(movieId: string): Promise<number> {
    try {
    const results = await this.ratingCollection().aggregate([
      { $match: { target: 'movie', targetId: movieId } },
      { $group: { _id: null, moyenne: { $avg: "$score" } } }
    ]).toArray();
    const moyenne = results[0].moyenne;
    if (moyenne!== null){
      return moyenne;
    }
    return 0.0;
    } catch (error) {
        throw new Error('Erreur lors du calcul de la moyenne des films');
    }

  }
  async getSeriesAverage(serieId: string): Promise<number> {
    try {
    const results = await this.ratingCollection().aggregate([
      {
        $lookup: {
          from: 'episodes',
          localField: 'targetId',
          foreignField: '_id',
          as: 'episodes'
        }
      },
      { $unwind: "$episodes" }, // Décompose le tableau episodes
      { $match: { "episodes.seriesId": serieId, "target":"episode"} },
      { $group: { _id: null, moyenne: { $avg: "$score" } } }
    ]).toArray();
    const moyenne = results[0].moyenne;
    if (moyenne!== null){
      return moyenne;
    }
    return 0.0;
    } catch (error) {
        throw new Error('Erreur lors du calcul de la moyenne des séries');
    }

  }




  formatRatingResponse(rating: IRating): IRatingResponse {
    return {
      id: rating.id,
      userId: rating.userId,
      target: rating.target,
      targetId: rating.targetId,
      score: rating.score,
      review: rating.review
    }
  }
}