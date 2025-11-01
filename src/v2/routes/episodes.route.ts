import { Router } from "express";
import { EpisodeController } from "../controllers/EpisodeController";
import { verifyTokenMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/roles.middleware";


const router = Router();

const controller = new EpisodeController();

router.get('/:seriesId/seasons/:seasonId/episodes', controller.getAllEpisodesBySaison.bind(controller));


router.post('/:seriesId/seasons/:seasonId/episodes', verifyTokenMiddleware, roleMiddleware(['admin']), controller.createEpisode.bind(controller));


router.get('/:seriesId/seasons/:seasonId/episodes/:id', controller.getEpisodeById.bind(controller));


export default router;