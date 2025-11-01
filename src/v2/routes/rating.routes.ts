import { Router } from "express";
import { RatingController } from "../controllers/RatingController";
import { verifyTokenMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/roles.middleware";


const router = Router();

const controller = new RatingController();



router.post('/', verifyTokenMiddleware, controller.createRating.bind(controller));


router.get('/avg/movie/:movieId', controller.getMovieAvg.bind(controller));
router.get('/avg/series/:seriesId', controller.getSeriesAvg.bind(controller));

export default router;