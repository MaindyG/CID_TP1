import express, { Request, Response } from 'express';
import { Router } from 'express';
import { logger } from '../logs/logger'
import { PersistanceService } from '../services/persistance';
import { validateMedia } from '../middlewares/validationRegex';
import { requireAdmin } from '../middlewares/adminMiddleware';
import { error } from 'console';

// Initialisation du routeur
const app = express.Router();

// Instance du service de persistance
const persistanceService = new PersistanceService();




//Route pour obtenire les medias filtrés
app.get('/', async (req: Request, res: Response) => {
    try {

        // Lecture de la base de données
        const data = await persistanceService.lectureDB();

        // Stocjkage des médias 
        let filteredMedias = data.medias;

        // Récupération des paramètres de requête pour le filtrage
        const { genre, year } = req.query;

        // Filtrage des médias en fonction des paramètres fournis
        if (genre) {
            filteredMedias = filteredMedias.filter((m: any) => m.genre.toLowerCase() === (genre as string).toLowerCase());
        }
        if (year) {
            filteredMedias = filteredMedias.filter((m: any) => m.year === parseInt(year as string, 10));
        }

        // Renvoyer les médias filtrés
        res.json(filteredMedias);

        // Log de l'action
        logger.info('Médias récupérés avec succès');

        // Gestion des erreurs
    } catch (error) {
        logger.error('Erreur', { error })
        res.status(500).json({ error: 'Erreur serveur' });
    }
});




// Route pour otenier un media par id
app.get('/:id', async (req: Request, res: Response) => {
    try {

        // Lecture de la base de données
        const data = await persistanceService.lectureDB();

        // Récupération de l'ID du média depuis les paramètres de la requête
        const mediaId = req.params.id

        // Trouver le média correspondant
        const media = data.medias.find((m: any) => m.id === mediaId);

        // Si le média existe, le renvoyer, sinon renvoyer une erreur 404
        if (media) {
            res.json(media);
            logger.info('Média récupéré avec succès');
        } else {
            res.status(404).send('Media introuvable');

        }

        // Log de l'action
        logger.info('Média récupéré avec succès');

        // Gestion des erreurs
    } catch (error) {
        logger.error('Erreur', { error })
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour creer un film 
app.post('/films', validateMedia, requireAdmin, async (req: Request, res: Response) => {
    try {

        // Lecture de la base de données
        const data = await persistanceService.lectureDB();

        // Récupération des données de la requête
        const { title, genre, year, rating, duration, watched } = req.body;

        //Generer un id aléatoire et vérifie que le titre n'est pas déjà utilisé
        let randomId = Math.floor(Math.random() * 10000).toString();
        if (data.medias.some((m: any) => m.title.toLowerCase() === title.toLowerCase())) {
            return res.status(409).json({ error: 'Titre déjà utilisé' });
        }

        // Créer le nouveau média
        const newMedia = { id: randomId, title, genre, year, rating, duration, watched };

        // Ajouter le nouveau média à la base de données
        data.medias.push(newMedia)

        // Écrire les modifications dans la base de données
        await persistanceService.ecritureDB(data);

        // Renvoyer une réponse de succès avec le nouveau média
        res.status(201).location(`/api/medias/${newMedia.id}`).json(newMedia);

        // Log de l'action
        logger.info(`Film créé: ${title}`);

        // Gestion des erreurs
    } catch (error) {
        logger.error('Erreur', { error })
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour creer un series 
app.post('/series', validateMedia, requireAdmin, async (req: Request, res: Response) => {
    try {
        // Lecture de la base de données
        const data = await persistanceService.lectureDB();

        // Récupération des données de la requête
        const { title, genre, year, rating, status } = req.body;

        //Generer un id aléatoire et vérifie que le titre n'est pas déjà utilisé
        let randomId = Math.floor(Math.random() * 10000).toString();
        if (data.medias.some((m: any) => m.title.toLowerCase() === title.toLowerCase())) {
            return res.status(409).json({ error: 'Titre déjà utilisé' });
        }

        // Créer le nouveau média
        const newMedia = { id: randomId, title, genre, year, rating, status, seasons: [] };

        // Ajouter le nouveau média à la base de données
        data.medias.push(newMedia)

        // Écrire les modifications dans la base de données
        await persistanceService.ecritureDB(data);

        // Renvoyer une réponse de succès avec le nouveau média
        res.status(201).location(`/api/medias/${newMedia.id}`).json(newMedia);
        logger.info(`Série créée: ${title}`);

        // Gestion des erreurs
    } catch (error) {
        logger.error('Erreur', { error })
        res.status(500).json({ error: 'Erreur serveur' });
    }
});


// Route pour modifier un media
app.put('/:id', validateMedia, requireAdmin, async (req: Request, res: Response) => {
    try {
        const data = await persistanceService.lectureDB();
        const mediaId = req.params.id
        const media = data.medias.find((m: any) => m.id === mediaId);

        Object.assign(media, req.body);
        await persistanceService.ecritureDB(data)
        res.status(200).json(media)
        logger.info(`Média modifié: ${media.title}`);
    } catch (error) {
        logger.error('Erreur', { error })
        res.status(500).json({ error: 'Erreur serveur' });
    }


});


// ROute pour Supprimer un contenu
app.delete('/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
        const data = await persistanceService.lectureDB();
        const mediaId = req.params.id
        const media = data.medias.find((m: any) => m.id === mediaId);
        data.medias = data.medias.filter((m: any) => m.id !== mediaId);
        await persistanceService.ecritureDB(data);
        res.status(204).send();
        logger.info(`Média supprimé: ${media.title}`);
    } catch (error) {
        logger.error('Erreur', { error })
        res.status(500).json({ error: 'Erreur serveur' });
    }
});




export default app;
