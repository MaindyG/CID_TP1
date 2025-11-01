import { Request, Response } from 'express';
import { EpisodeService } from '../services/EpisodeService';
import { IUser } from '../models/User';

export class EpisodeController {
    private episodeService: EpisodeService;

    constructor() {
        this.episodeService = new EpisodeService();
    }

  async getAllEpisodesBySaison(req: Request, res: Response) {
        try {
            const { seasonId } = req.params;
            const episodes = await this.episodeService.getEpisodesBySaison(seasonId);
            res.json(episodes);

        } catch (error) {
            res.status(500).json({ message: 'Erreur Serveur' });

        }
    }
    async getEpisodeById(req: Request, res: Response): Promise<void> {
try {
        const id = (req.params.id);
        const episode = await this.episodeService.getEpisodeById(id);

        if (episode) {
            res.json(episode);
        } else {
            res.status(404).send('Episode introuvable');
        }
        return;
} catch {
    res.status(500).json({ message: 'Erreur Serveur' });    
    }}

    async createEpisode(req: Request, res: Response) {
        try {
            const { seriesId, seasonId } = req.params;
            const episodeData = {
                ...req.body,
                seriesId: seriesId,
                seasonId: seasonId,
            };
            const episode = await this.episodeService.createEpisode(episodeData);
            res.status(201).json(episode);
        } catch {
            res.status(500).json({ message: 'Erreur Ajout depisode' });
        }
    }

 
   
}

