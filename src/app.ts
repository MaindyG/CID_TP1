import express, { Request, response, Response } from 'express';
import { authLimiter, ratingLimiter } from './v2/middlewares/rateLimit.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

import mediasRoutes from './v1/routes/mediasRoutes';
import serieRoutes from './v1/routes/serieRoutes';
import userRoutes from './v1/routes/userRoutes';
import logsRoutes from './v1/routes/logsRoutes';
import episodeRoutes from './v1/routes/episodesRoutes';

import authRoutes from './v2/routes/auth.route';
import movieRoutesV2 from './v2/routes/movies.routes';
import seriesRoutesV2 from './v2/routes/series.route';
import episodesRoutesV2 from './v2/routes/episodes.route'
import ratingRoutesV2 from './v2/routes/rating.routes'
import userRoutesV2 from './v2/routes/users.route';
import saisonsRoutesV2 from './v2/routes/saisons.routes';

const corsOptions = {
    origin: 'http://localhost:4200', // Autoriser uniquement cette origine
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
};

const swaggerOptionsV2 = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TP2 - Suivi de médias API V2',
      version: '2.0.0',
      description: 'API pour la gestion et le suivi des médias (films et séries) - Version 2',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v2',
      },
    ], 
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
  },
    apis: ['./src/v2/routes/*.ts'] // Chemin vers les fichiers contenant les annotations Swagger
};
const swaggerOptionsV1 = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TP1 - Suivi de médias API V1',
      version: '1.0.0',
      description: 'DEPRECATED -  API pour la gestion et le suivi des médias - Version 1',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ], 
  },
        apis: ['./src/v1/routes/*.ts'], // Chemin vers les fichiers contenant les annotations Swagger

};


// Générer la documentation à partir des options
const swaggerDocsV2 = swaggerJsdoc(swaggerOptionsV2);
const swaggerDocsV1 = swaggerJsdoc(swaggerOptionsV1);




// Initialisation de l'application Express
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());
app.use('/api/v2/auth', authLimiter);
app.use('/api/v2/ratings', ratingLimiter);  
app.use(cors(corsOptions));
// Servir la documentation Swagger via '/api-docs'
app.use('/docs/v2', swaggerUi.serveFiles(swaggerDocsV2), swaggerUi.setup(swaggerDocsV2));
app.use('/docs/v1', swaggerUi.serveFiles(swaggerDocsV1), swaggerUi.setup(swaggerDocsV1));






//=== V1 API ===//
// Routes pour les médias
app.use('/api/v1/medias',mediasRoutes);

// Routes pour les séries
app.use('/api/v1/series',serieRoutes);

// Routes pour les utilisateurs
app.use('/api/v1/users',userRoutes);

// Routes pour les épisodes
app.use('/api/v1/episodes',episodeRoutes);

// Routes pour les logs
app.use('/api/v1/logs',logsRoutes);

//=== END V1 API ===//

//=== V2 API ===//

app.use('/api/v2/auth', authRoutes)
app.use('/api/v2/movies', movieRoutesV2)
app.use('/api/v2/series', seriesRoutesV2)
app.use('/api/v2/series', episodesRoutesV2)
app.use('/api/v2/ratings', ratingRoutesV2);
app.use('/api/v2/users', userRoutesV2);
app.use('/api/v2/series', saisonsRoutesV2);

app.get('/api/v2/test', (req: Request, res: Response) => {
  res.json({ message: 'API V2 fonctionne!' });
});


//=== END V2 API ===//


export default app;

