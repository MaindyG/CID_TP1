
import express, { Request, Response } from 'express';
import { Router } from 'express';
import { logger } from '../logs/logger'
import { PersistanceService } from '../services/persistance';
import { validateMedia } from '../middlewares/validationRegex';
import { requireAdmin } from '../middlewares/adminMiddleware';

// Initialisation du routeur
const app = express.Router();

// Instance du service de persistance
const persistanceService = new PersistanceService();



// Route pour creer un episode d'une saison 
app.post('/', async (req: Request, res: Response) => {
    try {

        // Lecture de la base de données
        const data = await persistanceService.lectureDB();

        // Récupération des données de la requête
        const { serieId, seasonId, title, duration, episodeNumber } = req.body;

        // Validation des données
        const serie = data.medias.find((m: any) => m.id === serieId)

        // Si la série ou la saison n'existe pas, renvoyer une erreur 404
        if (!serie) return res.status(404).json({ error: 'Serie non trouvé' });

        // Trouver la saison correspondante
        const season = serie.seasons.find((s: any) => s.id === seasonId);

        // Si la saison n'existe pas, renvoyer une erreur 404
        if (!season) return res.status(404).json({ error: 'Saison non trouvée' });

        // Créer un nouvel épisode avec un ID unique
        let randomId = Math.floor(Math.random() * 10000).toString();

       
        // Créer le nouvel épisode
        const newEpisode = { id: randomId, title, duration, episodeNumber, watched: false };

        // Ajouter le nouvel épisode à la saison
        if (!season.episodes) {
            season.episodes = [];
        }
        season.episodes.push(newEpisode);

        // Écrire les modifications dans la base de données
        await persistanceService.ecritureDB(data);

        // Log de l'action
        logger.info(`Épisode créé: ${title} (Saison ${season.seasonNumber}) dans la série ${serie.title}`);

        // Renvoyer une réponse de succès avec le nouvel épisode
        res.status(201).json(newEpisode);

        // Gestion des erreurs
    } catch (error) {
        logger.error('Erreur',  {error} )
        res.status(500).json({ error: 'Erreur serveur' });
        
    }
});
export default app;
