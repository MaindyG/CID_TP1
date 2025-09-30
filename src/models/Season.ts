import { Episode } from "./Episode";
export class Season {

    private episodes: Episode[] = [];
    constructor(
        private seasonNumber: number,
        private releaseDate: Date
    ) { }
    public addEpisode(episode: Episode): void {
        this.episodes.push(episode);
    }

    public getEpisodes(): Episode[] {
        return this.episodes;
    }

    public getSeasonNumber(): number { return this.seasonNumber; }
    public getReleaseDate(): Date { return this.releaseDate; }
}