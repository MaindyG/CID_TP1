import { Schema, model, Document } from 'mongoose';

export const UserModelSchema = model('User', new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    favorites: { type: [String], default: [] }
}));

export const MovieModelSchema = model('Movie', new Schema({
    title: { type: String, required: true },
    genres: { type: [String] },
    synopsis: { type: String },
    releaseDate: { type: Number },
    duration: { type: Number }
}));

export const RatingModelSchema = model('Rating', new Schema({
    userId: { type: String, required: true },
    target:    { type: String, enum: ['movie', 'series'], required: true },
        targetId: { type: String, required: true },
    score: { type: Number, required: true, min: 0, max: 10 },
    review: { type: String }
}));

export const SerieModelSchema = model('Serie', new Schema({
    title: { type: String, required: true },
    genres: { type: [String] },
    status: { type: String, enum: ['ongoing', 'ended'] },
})) 
export const EpisodeModelSchema = model('Episode', new Schema({
    serieId: { type: String, required: true },
    seasonId: { type: String, required: true },
    title: { type: String, required: true },
    epNo: { type: Number, required: true },
    duration: { type: Number }
}));

export const SeasonModelSchema = model('Season', new Schema({
    serieId: { type: String, required: true },
    seasonNo: { type: Number, required: true },
    episodes: { type: Number }
}));