import { rateLimit } from 'express-rate-limit'
// Source : https://www.npmjs.com/package/express-rate-limit
export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes).
    message: {
        message: 'Trop de requêtes créées à partir de cette IP, veuillez réessayer après 15 minutes'
    },
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

export const ratingLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 10, // Limit each IP to 5 requests per `window` (here, per 15 minutes).
    message: {
        message: 'Trop de notations créées à partir de cette IP, veuillez réessayer après 15 minutes'
    },
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

