
import { getDB } from '../../db/connection';
import { ISeason, ISeasonResponse } from '../models/Series';


export class SaisonService {
  private saisonCollection = () => getDB().collection<ISeason>('saisons')


  async getAllSaisons(): Promise<ISeason[]> {
    try {
    const saisons = await this.saisonCollection().find().toArray();
    return saisons?.map(saisons => this.formatSaisonResponse(saisons)) || [];
    } catch (error) {
        throw new Error('Erreur lors de la récupération des saisons');
    }
  }

  async getSaisonById(saisonId: string): Promise<ISeason | undefined> {
    try {
    return this.getAllSaisons().then(saisons => saisons.find(saison => saisonId === saison.id));
    } catch (error) {
        throw new Error('Erreur lors de la récupération de la saison par ID');
    }
  }

  async getSaisonBySerie(serieId: string): Promise<ISeason[]> {
    try {
    const saisons = await this.getAllSaisons();
    return saisons.filter(saison => saison.seriesId === serieId);
    } catch (error) {
        throw new Error('Erreur lors de la récupération des saisons par série');
    }
  }



  async createSaison(saisonData: ISeason): Promise<ISeason> {
    try {
    const saisonCount = await this.saisonCollection().countDocuments();
    const newSaison: ISeason = {
      ...saisonData,
      id: (saisonCount + 1).toString()
    }
    await this.saisonCollection().insertOne(newSaison);
    return this.formatSaisonResponse(newSaison);
    } catch (error) {
        throw new Error('Erreur lors de la création de la saison');
    }
  }


  formatSaisonResponse(saison: ISeason): ISeasonResponse {
    return {
      id: saison.id,
      seriesId: saison.seriesId,
      seasonNo: saison.seasonNo,
      title: saison.title,
      episodes: saison.episodes
    }
  }
}