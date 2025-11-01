import express, { Request, Response } from 'express';
import { Router } from 'express';
import fs from 'fs/promises';

import { PersistanceService } from '../services/persistance';
import { logger } from '../logs/logger';

// Initialisation du routeur
const app = express.Router();

// Recherche et ajout du dernier log
app.get('/', async (req: Request, res: Response) => {
    try {
        // Lire le fichier des logs
        const logs = await fs.readFile("./src/logs/logs.log", 'utf-8');
        const logsLines = logs.split('\n').filter(line => line.trim());     // divise le fichier en lignes
        const lastLog = JSON.parse(logsLines[logsLines.length - 1]);         //cherche la derniere ligne

        // Renvoyer le dernier log
        res.json({
            action: lastLog
        })
        
        // Log de l'action
        logger.info('Dernier log récupéré avec succès');

        // Gestion des erreurs
    } catch (error) {
        logger.error('Erreur', { error })
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

export default app;