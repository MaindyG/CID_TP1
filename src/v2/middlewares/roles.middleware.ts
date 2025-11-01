import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role || '';

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Accès interdit.' });
      }

      next();
    } catch {
      return res.status(403).json({ message: 'Accès interdit.' });
    }
  }
};
