import express, { Request, Response } from 'express';
import mediasRoutes from './routes/mediasRoutes';
import serieRoutes from './routes/serieRoutes';
import userRoutes from './routes/userRoutes';
import logsRoutes from './routes/logsRoutes';
import episodeRoutes from './routes/episodesRoutes'



// Initialisation de l'application Express
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());


// Routes pour les médias
app.use('/api/medias',mediasRoutes);

// Routes pour les séries
app.use('/api/series',serieRoutes);

// Routes pour les utilisateurs
app.use('/api/users',userRoutes);

// Routes pour les épisodes
app.use('/api/episodes',episodeRoutes);

// Routes pour les logs
app.use('/api/logs',logsRoutes);

// Démarrage du serveur
app.listen(port,() =>{
    console.log(' ✅ | Serveur en ligne sur le port',port);
})

