import * as express from "express"
import { IUserBase } from "../models/User";
import {Request, Response, NextFunction } from 'express';
import { verifyToken } from "../utils/jwt";


declare global {
  namespace Express {
    interface Request {
      user?: IUserBase;
    }
  }
}

// Middleware pour vérifier le JWT
export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1] || "";

  try {
    const decoded = verifyToken(token) as IUserBase;
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};
