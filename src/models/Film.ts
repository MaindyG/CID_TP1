import { Media } from './Media';

export class Film extends Media {
    constructor(
        id: string,
        title: string,
        genre: string,
        year: number,
        rating: number,
        private duration: number,
        private watched: boolean
    ) {
        super(id, title, genre, year, rating);
        this.duration = duration;
        this.watched = watched;
    }


    public getSummary(): string {
        return `${this.getTitle()} (${this.getYear()}) - Genre: ${this.getGenre()}, Rating: ${this.getRating()}, Duration: ${this.duration} mins, Watched: ${this.watched ? 'Yes' : 'No'}`;
    }
     
}