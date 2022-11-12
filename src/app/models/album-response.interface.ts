import { Album } from './album.model';

export interface AlbumResponse {
    data: Album[];
    next: string;
    total: number;
}
