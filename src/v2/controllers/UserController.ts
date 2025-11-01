import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { IUser } from '../models/User';
import { getDB } from '../../db/connection';
import { ObjectId } from 'mongodb';
import { validateRegister } from '../middlewares/validation.middleware';

export class UserController {
    private userCollection = () => getDB().collection<IUser>('users');

    async getUserConnected(req: Request, res: Response) {
        try {
            if (!req.user || !req.user.email) {
                return res.status(401).json({ message: 'Utilisateur non authentifié' });
            }
            const user = await this.userCollection().findOne(
                { email: req.user.email },
                { projection: { password: 0 } } //mot de passe non renvoyé
            );
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Utilisateur introuvable' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur Serveur' });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            if (!req.user || !req.user.email) {
                return res.status(401).json({ message: 'Utilisateur non authentifié' });
            }

            const { username, favorites } = req.body;
            const updateData: any = {};
            if (username) {
                const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
                if (!usernameRegex.test(username)) {
                    return res.status(400).json({ message: 'Nom d\'utilisateur invalide. Il doit contenir entre 3 et 30 caractères alphanumériques ou des underscores.' });
                }


                updateData.username = username;
            }

            if (favorites && Array.isArray(favorites)) {
                updateData.favorites = favorites;
            } else if (favorites) {
                return res.status(400).json({ message: 'Favorites doit être un tableau.' });
            }

            const result = await this.userCollection().updateOne(
                { email: req.user.email },
                { $set: updateData }
            );
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Utilisateur introuvable' });
            }
            res.json({ message: 'Utilisateur mis à jour avec succès' });

        } catch (error) {
            res.status(500).json({ message: 'Erreur Serveur' });
        }
    }
    async getUserById(req: Request, res: Response) {
        try {

            const { id } = req.params;
            if (req.user?.role !== 'admin') {
                return res.status(403).json({ message: 'Accès refusé (Admins Only)' });
            }
            const user = await this.userCollection().findOne(
                { _id: new ObjectId(id) },
                                { projection: { password: 0 } } //mot de passe non renvoyé

            );


            if (user) {
                res.json(user);
            } else {
                res.status(404).send('Utilisateur introuvable');
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur Serveur' });
        }
    }
}



