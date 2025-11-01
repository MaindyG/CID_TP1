import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { IUser } from '../models/User';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService =new AuthService ();
    }

    async register(req: Request, res: Response) {
        try {
        await this.authService.register(req.body);
        res.status(201).send('Utilisateur enregistré');
        } catch {
            res.status(500).json({message: 'Erreur Inscription'});
        }
    }

    async login(req: Request, res: Response) {
        try {
        const accessToken = await this.authService.login(req.body.email, req.body.password);

        if (accessToken) {
            res.json({ accessToken });
        } else {
            res.status(401).send('Nom d’utilisateur ou mot de passe incorrect');
        }
        } catch {
            res.status(500).json({message: 'Erreur Connexion'});
        }
    }

    home(req: Request, res: Response) {
        res.send('Hello, TypeScript with Express! Connexion sécurisée.');
    }
}