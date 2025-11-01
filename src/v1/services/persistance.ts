import express, { Request, response, Response } from 'express';

import fs from 'fs';
import path from 'path';
import { logger } from '../logs/logger';


// Chemin vers le fichier JSON
const db = 'src/data/db.json'

// Utilisation de fs.promises pour les opérations asynchrones sur le système de fichiers
const filesystem = require('fs').promises;

export class PersistanceService {


    // Méthode pour lire la base de données
    async lectureDB() {
        try {

            // Lire le fichier JSON
            const data = await filesystem.readFile(db, 'utf-8');

            // Parser le contenu JSON et le retourner
            return JSON.parse(data)

            // Gestion des erreurs
        } catch (err) {
            console.error(err);
        }
    }

    // Méthode pour écrire dans la base de données
    async ecritureDB(data: any) {
        try {

            // Convertir les données en chaîne JSON et écrire dans le fichier
            const jsonString = JSON.stringify(data);

            // Écrire les modifications dans la base de données
            await filesystem.writeFile(db, jsonString)


            // Gestion des erreurs
        } catch (error) {
            logger.error('Erreur', { error })
            response.status(500).json({ error: 'Erreur serveur' });
        }
    }
}