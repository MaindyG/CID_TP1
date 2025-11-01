
import { getDB } from '../../db/connection';
import { ISeries, ISeriesResponse } from '../models/Series';


export class SeriesService {
  private seriesCollection = () => getDB().collection<ISeries>('series')


  async getAllSeries(): Promise<ISeriesResponse[]> {
    try {
    const series = await this.seriesCollection().find().toArray();
    return series?.map(serie => this.formatMovieResponse(serie)) || [];
    } catch (error) {
        throw new Error('Erreur lors de la récupération des séries');
    }
  }

  async getSeriesById(seriesId: string): Promise<ISeriesResponse | undefined> {
    try {
    return this.getAllSeries().then(series => series.find(serie => seriesId === serie.id));
    } catch (error) {
        throw new Error('Erreur lors de la récupération de la série par ID');}
  }
   



  async createSeries(seriesData: ISeries): Promise<ISeriesResponse> {
    try {
    const seriesCount = await this.seriesCollection().countDocuments();
    const newSeries: ISeries = {
      ...seriesData,
      id: (seriesCount +1).toString()
    }
    await this.seriesCollection().insertOne(newSeries);
    return this.formatMovieResponse(newSeries);
    } catch (error) {
        throw new Error('Erreur lors de la création de la série');
    }
  }


  formatMovieResponse(series: ISeries): ISeriesResponse {
    return {
      id: series.id,
      title: series.title,
      genres: series.genres,
      status: series.status
    }
  }
}