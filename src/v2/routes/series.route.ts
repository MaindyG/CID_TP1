import { Router } from "express";
import { SeriesController } from "../controllers/SeriesController";
import { verifyTokenMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/roles.middleware";


const router = Router();

const controller = new SeriesController();

router.get('/', controller.getAllSeries.bind(controller));


router.post('/', verifyTokenMiddleware, roleMiddleware(['admin']), controller.createSeries.bind(controller));


router.get('/:id', controller.getSeriesById.bind(controller));


export default router;