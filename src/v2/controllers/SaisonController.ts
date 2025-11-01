import { Request, Response } from 'express';
import { SaisonService } from '../services/SaisonService';
import { IUser } from '../models/User';

export class SaisonController {
    private saisonService: SaisonService;

    constructor() {
        this.saisonService = new SaisonService();
    }

    async getAllSaisonBySeries(req: Request, res: Response) {
        try {
            const { seriesId } = req.params;
            const saison = await this.saisonService.getSaisonBySerie(seriesId);
            res.json(saison);

        } catch (error) {
            res.status(500).json({ message: 'Erreur Serveur' });

        }
    }
    async getSaisonById(req: Request, res: Response): Promise<void> {
            try {
        const id = (req.params.id);
        const saison = await this.saisonService.getSaisonById(id);

        if (saison) {
            res.json(saison);
        } else {
            res.status(404).send('Saison introuvable');
        }
        return;
    } catch {
        res.status(500).json({ message: 'Erreur Serveur' });    
    }
}

    async createSaison(req: Request, res: Response) {
        try {
            const { seriesId } = req.params;
            const saisonData = {
                ...req.body,
                seriesId: seriesId,
            };
            const saison = await this.saisonService.createSaison(saisonData);
            res.status(201).json(saison);
        } catch {
            res.status(500).json({ message: 'Erreur Ajout de series' });
        }
    }

    async getAllSaisons(req: Request, res: Response) {
        try {
            const saisons = await this.saisonService.getAllSaisons();
            res.json(saisons);
        } catch (error) {
            res.status(500).json({ message: 'Erreur Serveur' });
        }
    }

}