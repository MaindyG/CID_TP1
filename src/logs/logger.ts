import winston from 'winston';


// Configuration du logger
export const logger = winston.createLogger({
  // Le niveau minimum de log est défini à info. 
  // Cela signifie que tous les logs de niveau info et plus élevés (ex: warn, error) seront capturés.
  level: 'info', // Niveau minimum de log (info, warn, error, etc.)
  // Les logs sont formatés en JSON et incluent un timestamp pour chaque message.
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Format des logs en JSON
  ),
  // Le logger est configuré avec deux transports : la console et un fichier app.log
  transports: [
    new winston.transports.Console(), // Log vers la console
    new winston.transports.File({ filename: 'src/logs/logs.log', level:'info' }), // Log vers un fichier
    new winston.transports.File({ filename: 'src/logs/error.log', level:'error' }) // Log vers un fichier
]
});

