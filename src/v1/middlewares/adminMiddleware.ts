import express, { NextFunction, Request, Response } from 'express';
import { PersistanceService } from '../services/persistance';   
import { roles } from '../models/User';

// Middleware pour vérifier si l'utilisateur est admin
export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    // Récupère le rôle de l'utilisateur depuis le corps de la requête
    const {role} = req.body;

    // Vérifie si le rôle est admin
    if (role != 'admin') {
        return res.status(403).json({error : 'Seulement les admins peuvent effectuer cette action'});
    }
    next();

}