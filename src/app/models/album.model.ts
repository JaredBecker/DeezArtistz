export class Album {
    public id: number;
    public title: string;
    public link: string;
    public cover: string;
    public cover_small: string;
    public cover_medium: string;
    public cover_big: string;
    public cover_xl: string;
    public genre_id: number;
    public fans: number;
    public release_date: string;
    public record_type: string;
    public explicit_lyrics: boolean;

    constructor (options: Album) {
        this.id = options.id;
        this.title = options.title;
        this.link = options.link;
        this.cover = options.cover;
        this.cover_small = options.cover_small;
        this.cover_medium = options.cover_medium;
        this.cover_big = options.cover_big;
        this.cover_xl = options.cover_xl;
        this.genre_id = options.genre_id;
        this.fans = options.fans;
        this.release_date = options.release_date;
        this.record_type = options.record_type;
        this.explicit_lyrics = options.explicit_lyrics;
    }
}
