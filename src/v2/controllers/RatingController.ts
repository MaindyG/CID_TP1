import { Request, Response } from 'express';
import { RatingService } from '../services/RatingService';
import { IUser } from '../models/User';

export class RatingController {
    private ratingService: RatingService;

    constructor() {
        this.ratingService = new RatingService();
    }

    async createRating(req: Request, res: Response) {
        try {
            const rating = await this.ratingService.createRating(req.body);
            res.status(201).json(rating);
        } catch {
            res.status(500).json({ message: 'Erreur Ajout de Rating' });
        }
    }

    async getMovieAvg(req: Request, res: Response){
        try {
            const {movieId} = req.params;
            const moyenne = await this.ratingService.getMovieAverage(movieId);
            res.json(moyenne);
        } catch {
            res.status(500).json('Erreur de calcul avg films')
        }
    }

    async getSeriesAvg(req: Request, res: Response){
        try {
            const {seriesId} = req.params;
            const moyenne = await this.ratingService.getSeriesAverage(seriesId);
            res.json(moyenne);
        }   
        catch {
            res.status(500).json('Erreur de calcul avg series')
        }
    }

}