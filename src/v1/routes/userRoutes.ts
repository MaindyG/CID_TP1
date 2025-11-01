

import express, { Request, Response } from 'express';
import { Router } from 'express';
import {logger} from '../logs/logger'
import { PersistanceService } from '../services/persistance';


//
const app = express.Router();
const persistanceService = new PersistanceService();

// Route pour Liste des contenus d’un utilisateur spécifique
app.get('/:id/medias', async (req: Request, res: Response) => {
    try {

        // Lecture de la base de données
        const data = await persistanceService.lectureDB();

        // Récupération de l'ID de l'utilisateur depuis les paramètres de la requête
        const userId = req.params.id

        // Filtrer les médias appartenant à l'utilisateur spécifié
        const userMedias = data.medias.filter((m: any) => m.userId === userId)

        // Renvoyer la liste des médias de l'utilisateur
        res.json({ userMedias })

        // Log de l'action
        logger.info('Médias utilisateur récupérés avec succès');

        // Gestion des erreurs
    } catch (error) {
        logger.error('Erreur', { error })
        res.status(500).json({ error: 'Erreur serveur' });
    }
})


export default app;
