import express, { NextFunction, Request, Response } from 'express';

// Middleware pour valider les données d'un média
export const validateMedia = (req: Request, res: Response, next: NextFunction) => {
    // Récupère les données du corps de la requête
    const { title, duration, statut, year} = req.body;


    //Titre obligatoire
    if (!title){
        return res.status(400).send('Titre absent')
    }

    // Année avant 2025
    if (year > 2025){
        return res.status(400).send('Film sorti apres 2025 ! Veillez ajouter un film plus ancien')
    }

    //Doit contenir uniquement lettres, chiffres, espaces
    const titleRegex = /^[A-Za-z0-9\s]+$/;
    if (title && !titleRegex.test(title)) {
       return res.status(400).send('Le titre doit contenir uniquement lettres, chiffres, espaces');

    }

    //Entier positif
    const dureeRegex = /^[0-9]+$/;
    if (duration && !dureeRegex.test(duration.toString())) {
        return res.status(400).send('La duree doir etre un entier positif');

    }

    //une des valeurs :  en_cours , terminee
    const statusRegex = ['En_cours','Terminee']
     if (statut && !statusRegex.includes(statut)) {
       return res.status(400).send('Le statut doir etre une des valeurs :  en_cours , terminees');

    }
    // Si toutes les validations passent, on appelle next() pour continuer le traitement
    next();


}