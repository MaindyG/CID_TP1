import { Media } from "./Media";

export enum roles {
    ADMIN = 'admin',
    USER = 'user',
}
export class User {
    constructor(

        private id: string,
        private email: string,
        private password: string,
        private role: roles,
        private favorites: Media[],
    ) { }

    public addFavorite(media: Media) {
        this.favorites.push(media);
    }
    public removeFavorite(mediaId: string) {
        this.favorites = this.favorites.filter(media => media.getId() !== mediaId);
    }
    public getFavs(): Media[] {
        return this.favorites;
    }

    public getId(): string { return this.id; }
    public getEmail(): string { return this.email; }
    public getRole(): roles { return this.role; }
}
