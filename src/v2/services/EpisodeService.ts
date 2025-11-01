
import { getDB } from '../../db/connection';
import { IEpisode, IEpisodeResponse, ISeason, ISeasonResponse } from '../models/Series';


export class EpisodeService {
  private episodeCollection = () => getDB().collection<IEpisode>('episodes')


  async getAllEpisodes(): Promise<IEpisodeResponse[]> {
    try{
    const episodes = await this.episodeCollection().find().toArray();
    return episodes?.map(episode => this.formatEpisodeResponse(episode)) || [];
    } catch (error) {
        throw new Error('Erreur lors de la récupération des épisodes');
    }
  }

  async getEpisodeById(episodeId: string): Promise<IEpisodeResponse | undefined> {
    try{
    return this.getAllEpisodes().then(episodes => episodes.find(episodes => episodeId === episodes.id));
    } catch (error) {
        throw new Error('Erreur lors de la récupération de l\'épisode par ID');
    }
  }

  async getEpisodesBySaison(saisonId: string): Promise<IEpisodeResponse[]> {
    try {
    const episodes = await this.getAllEpisodes();
    return episodes.filter(episode => episode.seasonId === saisonId);
    } catch (error) {
        throw new Error('Erreur lors de la récupération des épisodes par saison');
    }
  }



  async createEpisode(episodeData: IEpisode): Promise<IEpisodeResponse> {
    try{
    const episodeCount = await this.episodeCollection().countDocuments();
    const newEpisode: IEpisode = {
      ...episodeData,
      id: (episodeCount + 1).toString()
    }
    await this.episodeCollection().insertOne(newEpisode);
    return this.formatEpisodeResponse(newEpisode);
    } catch (error) {
        throw new Error('Erreur lors de la création de l\'épisode');
    }
  }


  formatEpisodeResponse(episode: IEpisode): IEpisodeResponse {
    return {
      id: episode.id,
      seriesId: episode.seriesId,
      seasonId: episode.seasonId,
      epNo: episode.epNo,
      title: episode.title,
      durationMin: episode.durationMin
    }
  }
}