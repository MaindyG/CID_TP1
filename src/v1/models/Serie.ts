import { Media } from "./Media";
import { Season } from "./Season";


export enum Status {
    EN_COURS = 'En_cours',
    TERMINEE = 'Terminee',
}

export class Serie extends Media {
    private seasons: Season[] = []
    constructor(
        id: string,
        title: string,
        genre: string,
        year: number,
        rating: number,
        private status: Status,
        

    ) {
        super(id, title, genre, year, rating);
        this.status = status;
    }
    public getSummary(): string {
        return `${this.getTitle()} (${this.getYear()}) - Genre: ${this.getGenre()}, Rating: ${this.getRating()}, Status: ${this.status}, Seasons: ${this.seasons.length}`;
    }

    public addSeason(season: Season): void {
        this.seasons.push(season);
    }

    public getSeasons(): Season[] {
        return this.seasons;
    }

    public getStatus(): Status { return this.status; }


}
