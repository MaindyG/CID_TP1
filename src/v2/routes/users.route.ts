import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { verifyTokenMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/roles.middleware";


const router = Router();

const controller = new UserController();

router.get('/me', verifyTokenMiddleware, controller.getUserConnected.bind(controller));


router.patch('/me', verifyTokenMiddleware, controller.updateUser.bind(controller));


router.get('/:id', verifyTokenMiddleware, roleMiddleware(['admin']), controller.getUserById.bind(controller));


export default router;