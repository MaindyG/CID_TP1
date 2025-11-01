import express, { NextFunction, Request, Response } from 'express';

// Middleware pour valider les données d'un user
export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    // Récupère les données du corps de la requête
    const { email, username, password} = req.body;


    //Email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
       return res.status(400).send('Veuillez revoir la formulationde votre email');

    }

    //Username 
    const usernameRegex = /^[a-zA-Z0-9._-]{3,30}$/;
    if (!usernameRegex.test(username)) {
       return res.status(400).send('Le username doit avoir entre 3 et 30 caractères alphanumerique ou contenir  ._-');

    }
    //Password 
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
       return res.status(400).send('Le password doit avaoir au moins 8, 1 maj, 1 chiffre, 1 spécial');

    }


    
    // Si toutes les validations passent, on appelle next() pour continuer le traitement
    next();


}