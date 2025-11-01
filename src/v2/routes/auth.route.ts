import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateRegister } from '../middlewares/validation.middleware'

const router = Router();
const controller = new AuthController();



/**
 * * @swagger
 * /api/v2/auth/:
 * components:  
 * *   schemas:
 * *     RegisterRequest:
 * *       type: object
 * *       required:
 *           - email
 * *         - username
 * *         - password
 * *       properties:
 * *         email:
 * *            type: string
 *              format: email
 *              example: 'user@example.com'
 *              pattern: '/^[^\s@]+@[^\s@]+\.[^\s@]+$/'
 * *         username:
 * *            type: string
 *              minLength: 3
 *              maxLength: 30
 *              pattern: '/^[a-zA-Z0-9._-]{3,30}$/'
*               example: 'username_123'
* *         password:
* *            type: string
*              minLength: 8
*              pattern: '/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/'    
*              example: 'P@ssw0rd!'
* *     LoginRequest:
* *       type: object
* *       required:
*          - email
*        - password
* properties:
* *         email:
* *            type: string
*              format: email
*              example: 'user@example.com'
* password:
* *            type: string
*              example: 'P@ssw0rd!'
* AuthResponse:
* *       type: object
* *       properties:
*         token:
*            type: string
*             example: 'eyJhbGciOiJI
* UserResponse:
* *       type: object
* *       properties:
*         id:
*            type: string
*             example: '609e129e123abc456def7890'
*         email:
*            type: string
*             example: 'user@example.com'
*        username:
*           type: string
*            example: 'username_123'
*         role:
*           type: string
*           enum: [user, admin]
*            example: 'user'
*         favorites:
*          type: array
*          items:
*           type: string
*            example: ['movie1', 'movie2']
* 
 * 
 */
router.get('/', controller.home.bind(controller));


/**
 * * @swagger
 *  * /api/v2/auth/register:
 * *   post:
 * *     summary: Inscrire un nouvel utilisateur
 * *     tags: [Auth]
 * *     requestBody:
 * *       required: true
 * *       content:
 * *         application/json:
 * *           schema:
 * *             $ref: '#/components/schemas/UserRegister'
 * *     responses:
 * *       201:
 * *         description: Utilisateur créé avec succès
 * *         content:
 * *           application/json:
 * *             schema:
 * *               $ref: '#/components/schemas/UserResponse'
 * *       400:
 * *         description: Requête invalide
 * *       500:
 * *         description: Erreur serveur
 * 
 */
router.post('/register', validateRegister, controller.register.bind(controller));

/**
 * * * @swagger
 *  * /api/v2/auth/login:
 * *   post:
 * *     summary: Authentifier un utilisateur
 * *     tags: [Auth]
 * *     requestBody:
 *  *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 * *     responses:
 * *       200:
 * *         description: Authentification réussie
 * *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 * *       400:
 * *         description: Requête invalide
 *           content:
 * *       401:
 * *         description: Non autorisé
 *          content:
 *             application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                     example: 'Email ou mot de passe incorrect'
 * 
 */
router.post('/login', controller.login.bind(controller));

export default router;