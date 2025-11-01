import { Router } from "express";
import { SaisonController } from "../controllers/SaisonController";
import { verifyTokenMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/roles.middleware";


const router = Router();

const controller = new SaisonController();

router.get('/:seriesId/seasons', controller.getAllSaisonBySeries.bind(controller));


router.post('/:seriesId/seasons', verifyTokenMiddleware, roleMiddleware(['admin']), controller.createSaison.bind(controller));


router.get('/:seriesId/seasons/:id', controller.getSaisonById.bind(controller));

router.get('/:seriesId/seasons', controller.getAllSaisons.bind(controller));

export default router;