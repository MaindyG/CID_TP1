
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


//Route pour Liste des épisodes d’une série spécifique
app.get('/:id/episodes', async (req: Request, res: Response) => {
    try {
        // Lecture de la base de données
        const data = await persistanceService.lectureDB();

        // Récupération de l'ID de la série depuis les paramètres de la requête
        const mediaId = req.params.id

        // Trouver la série correspondante
        const serie = data.medias.find((m: any) => m.id === mediaId)

        // Si la série n'existe pas, renvoyer une erreur 404
        if (!serie) return res.status(404).json({ error: 'Serie non trouvé' });

        // Renvoyer la liste des épisodes de la série
        res.json(serie.episodes);

        // Log de l'action
        logger.info(`Épisodes de la série ${serie.title} récupérés avec succès`);

        // Gestion des erreurs
    } catch (error) {
        logger.error('Erreur', { error })
        res.status(500).json({ error: 'Erreur serveur' });
    }
})

// Route pour creer une saison d'une serie 
app.post('/seasons', async (req: Request, res: Response) => {
    try {

        // Lecture de la base de données
        const data = await persistanceService.lectureDB();

        // Récupération des données de la requête
        const { id, seasonNumber, releaseDate } = req.body;

        // Validation des données
        const serie = data.medias.find((m: any) => m.id === id);

        // Si la série n'existe pas, renvoyer une erreur 404
        if (!serie) return res.status(404).json({ error: 'Serie non trouvé' });

        //Generer un id aléatoire et vérifie que le numéro de saison n'est pas déjà utilisé
        let randomId = Math.floor(Math.random() * 10000).toString();

        // Vérifie que le numéro de saison n'est pas déjà utilisé
        if (serie.seasons.some((s: any) => s.seasonNumber === seasonNumber)) {
            return res.status(409).json({ error: 'Numéro de saison déjà utilisé' });

        }


        // Créer la nouvelle saison
        const newSeason = { id: randomId, seasonNumber: seasonNumber, releaseDate: releaseDate, episodes: [] };

        // Ajouter la nouvelle saison à la série
        if (!serie.seasons) {
            serie.seasons = [];
        }
        serie.seasons.push(newSeason);

        // Écrire les modifications dans la base de données
        await persistanceService.ecritureDB(data);

        // Renvoyer une réponse de succès avec la nouvelle saison
        res.status(201).json(newSeason);

        // Log de l'action
        logger.info(`Saison créée: ${seasonNumber} dans la série ${serie.title}`);

        // Gestion des erreurs
    } catch (error) {
        logger.error('Erreur', { error })
        res.status(500).json({ error: 'Erreur serveur' });
    }
});




export default app;
