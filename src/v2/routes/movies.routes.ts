import { Router } from "express";
import { MovieController } from "../controllers/MovieController";
import { verifyTokenMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/roles.middleware";


const router = Router();

const controller = new MovieController();

router.get('/', controller.getAllMovies.bind(controller));


router.post('/', verifyTokenMiddleware, roleMiddleware(['admin']), controller.createMovie.bind(controller));

router.get('/:id', controller.getMovieById.bind(controller));

router.patch('/:id', verifyTokenMiddleware, roleMiddleware(['admin']), controller.updateMovie.bind(controller));
router.delete('/:id', verifyTokenMiddleware, roleMiddleware(['admin']), controller.deleteMovie.bind(controller));


export default router;