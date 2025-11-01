
import { parse } from 'path';
import { getDB } from '../../db/connection';
import { IMovie, IMovieResponse } from '../models/Movie'


export class MovieService {
  private moviesCollection = () => getDB().collection<IMovie>('movies')

  // Source : https://medium.com/@saranipeiris17/implementing-pagination-in-mongodb-with-node-js-and-express-8b94125117a7
  async getAllMovies(filters: any, page: number, limit: number): Promise<{ items: IMovieResponse[], total: number, page: number, pages: number }> {
    try {
    const query: any = {};
    query.releaseDate = {};


    if (filters.title) {
      query.title = { $regex: filters.title, $options: 'i' };
    }

    if (filters.genre) {
      query.genres = { $in: [filters.genre] };
    }
    if (filters.minYear) {
      query.releaseDate.$gte = parseInt(filters.minYear);
    }
    if (filters.maxYear) {
      query.releaseDate.$lte = parseInt(filters.maxYear);
    }

    if (filters.maxDur) {
      query.duration = { $lte: parseInt(filters.maxDur) };
    }

    const movies = await this.moviesCollection()
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    const nbrePages = await this.moviesCollection().countDocuments(query);
    const totalPages = Math.ceil(nbrePages / limit);

    return {
      items: movies.map(movie => this.formatMovieResponse(movie)),
      total: nbrePages,
      page: page,
      pages: totalPages
    };
    } catch (error) {
        throw new Error('Erreur lors de la récupération des films');
    }
  }



  async getMovieById(movieId: string): Promise<IMovieResponse | undefined> {
    try {
    const movies = await this.moviesCollection().findOne({ id: movieId });
    return movies ? this.formatMovieResponse(movies) : undefined;
    } catch (error) {
        throw new Error('Erreur lors de la récupération du film par ID');
    }
  }




  async createMovie(movieData: IMovie): Promise<IMovieResponse> {
    try {
    if (!movieData.title || !movieData.genres || !movieData.durationMin) {
      throw new Error('Données de film invalides');
    }
    const movieCount = await this.moviesCollection().countDocuments();
    const newMovie: IMovie = {
      ...movieData,
      id: (movieCount + 1).toString()
    }
    await this.moviesCollection().insertOne(newMovie);
    return this.formatMovieResponse(newMovie);
  } catch (error) {
      throw new Error('Erreur lors de la création du film');
  }
  }
  async updateMovie(movieId: string, movieData: IMovie): Promise<IMovieResponse | null> {
    try {
    const updateResult = await this.moviesCollection().findOneAndUpdate(
      { id: movieId },
      { $set: movieData },
      { returnDocument: 'after' }
    );
    return updateResult;
  } catch (error) {
      throw new Error('Erreur lors de la mise à jour du film');
  }}

  async deleteMovie(movieId: string): Promise<void> {
    try{
    await this.moviesCollection().deleteOne({ id: movieId });
  } catch (error) {
      throw new Error('Erreur lors de la suppression du film');
  }}


  formatMovieResponse(movie: IMovie): IMovieResponse {
    return {
      id: movie.id,
      title: movie.title,
      genres: movie.genres,
      synopsis: movie.synopsis,
      releaseDate: movie.releaseDate,
      durationMin: movie.durationMin
    }
  }
}