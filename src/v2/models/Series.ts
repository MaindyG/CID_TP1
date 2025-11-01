import { status } from "./Enums";

export interface ISeries {
    id: string;
    title: string;
    genres: string[];
    status: status;
}

export interface ISeason {
    id: string;
    seriesId: string;
    seasonNo: number;
    title: string;
    episodes: number;
}



export interface IEpisode {
    id: string
    seriesId:string;
    seasonId: string;
    epNo: number;
    title: string;
    durationMin: number;
}

export interface ISeriesResponse extends ISeries {
}
export interface ISeasonResponse extends ISeason {
}
export interface IEpisodeResponse extends IEpisode {
}




