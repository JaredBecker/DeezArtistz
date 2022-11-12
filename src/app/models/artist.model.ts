export class Artist {
    public id: number;
    public link: string;
    public name: string;
    public nb_album: number;
    public nb_fan: number;
    public picture: string;
    public picture_big: string;
    public picture_medium: string;
    public picture_small: string;
    public picture_xl: string;
    public radio: boolean;
    public tracklist: string;
    public type: string;

    // Passing a single option to constructor to make it easier to add things to this if need be
    constructor(options: Artist) {
        this.id = options.id;
        this.link = options.link;
        this.name = options.name;
        this.nb_album = options.nb_album;
        this.nb_fan = options.nb_fan;
        this.picture = options.picture;
        this.picture_big = options.picture_big;
        this.picture_medium = options.picture_medium;
        this.picture_small = options.picture_small;
        this.picture_xl = options.picture_xl;
        this.radio = options.radio;
        this.tracklist = options.tracklist;
        this.type = options.type;
    }
}
