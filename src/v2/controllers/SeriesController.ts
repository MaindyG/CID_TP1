import { Request, Response } from 'express';
import { SeriesService } from '../services/SeriesServices';
import { IUser } from '../models/User';

export class SeriesController {
    private seriesService: SeriesService;

    constructor() {
        this.seriesService = new SeriesService();
    }

    async getAllSeries(req: Request, res: Response) {
        try {
            const series = await this.seriesService.getAllSeries();
            res.json(series);

        } catch (error) {
            res.status(500).json({ message: 'Erreur Serveur' });

        }
    }
    async getSeriesById(req: Request, res: Response): Promise<void> {
        try {
        const id = (req.params.id);
        const series = await this.seriesService.getSeriesById(id);

        if (series) {
            res.json(series);
        } else {
            res.status(404).send('Series introuvable');
        }
        return;
    } catch {
        res.status(500).json({ message: 'Erreur Serveur' });
    }
    }

    async createSeries(req: Request, res: Response) {
        try {
            const series = await this.seriesService.createSeries(req.body);
            res.status(201).json(series);
        } catch {
            res.status(500).json({ message: 'Erreur Ajout de series' });
        }
    }

}