
import { role } from "./Enums";

export interface IMovie {
    id:string;
    title: string;
    genres: string[];
    synopsis?: string;
    releaseDate?: number;
    durationMin: number;
}

export interface IMovieResponse extends IMovie {
}




