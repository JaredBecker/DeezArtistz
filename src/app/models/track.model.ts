export class Track {
    public id: number;
    public readable: boolean;
    public title: string;
    public title_short: string;
    public title_version: string;
    public link: string;
    public duration: number;
    public rank: number;
    public explicit_lyrics: boolean;
    public preview: string;
    public contributors: string[];
    public artist: { id: number, name: string }
    public album: {
        id: number;
        title: string;
        cover: string;
        cover_small: string;
        cover_medium: string;
        cover_big: string;
        cover_xl: string;
    }

    constructor(options: Track) {
        this.id = options.id;
        this.readable = options.readable;
        this.title = options.title;
        this.title_short = options.title_short;
        this.title_version = options.title_version;
        this.link = options.link;
        this.duration = options.duration;
        this.rank = options.rank;
        this.explicit_lyrics = options.explicit_lyrics;
        this.preview = options.preview;
        this.contributors = options.contributors;
        this.artist = options.artist;
        this.album = options.album
    }
}
