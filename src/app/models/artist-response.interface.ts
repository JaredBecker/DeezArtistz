import { Artist } from './artist.model';

export interface ArtistResponse {
    data: Artist[];
    next: string;
    total: number;
}
