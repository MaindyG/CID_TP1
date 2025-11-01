import { Request, Response } from 'express';
import { MovieService } from '../services/MovieServices';
import { IUser } from '../models/User';

export class MovieController {
    private movieService: MovieService;

    constructor() {
        this.movieService = new MovieService();
    }

    async getAllMovies(req: Request, res: Response) {
        try {
            const { title, genre, minYear, maxYear, maxDur, page = '1', limit = '10' } = req.query;
            const pageNumber = parseInt(page as string, 10) || 1;
            const limitNumber = parseInt(limit as string, 10) || 10;
            const filters = {
                title: title as string,
                genre: genre as string , 
                minYear: minYear as string,
                maxYear: maxYear as string,
                maxDur: maxDur as string ,
            }
            const movies = await this.movieService.getAllMovies(filters, pageNumber, limitNumber);
            res.json(movies);

        } catch (error) {
            res.status(500).json({ message: 'Erreur Serveur' });

        }
    }
    async getMovieById(req: Request, res: Response): Promise<void> {
        try {
        const id = (req.params.id);
        const movie = await this.movieService.getMovieById(id);

        if (movie) {
            res.json(movie);
        } else {
            res.status(404).send('Movie introuvable');
        }
        return;
    } catch {
        res.status(500).json({ message: 'Erreur Serveur' });
    }}

    async createMovie(req: Request, res: Response) {
        try {
            const movie = await this.movieService.createMovie(req.body);
            res.status(201).json(movie);
        } catch {
            res.status(500).json({ message: 'Erreur Ajout de film' });
        }
    }

    async updateMovie(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updatedMovie = await this.movieService.updateMovie(id, req.body);
            res.json(updatedMovie);
        } catch {   
            res.status(500).json({ message: 'Erreur mise à jour de film' });
        }
    }
    async deleteMovie(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.movieService.deleteMovie(id);
            res.status(204).send();
        } catch {
            res.status(500).json({ message: 'Erreur suppression de film' });
        }
    }

}