
export abstract class Media {
    constructor(
        private id: string,
        private title: string,
        private genre: string,
        private year: number,
        private rating: number
    ) { }

    public abstract getSummary(): string;

    public getId(): string {
        return this.id;
    }
    public getTitle(): string {     
        return this.title;  
    }
    public getGenre(): string {     
        return this.genre;  
    }
    public getYear(): number {     
        return this.year;  
    }
    public getRating(): number {     
        return this.rating;  
    }
}
