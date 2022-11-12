import { Track } from './track.model';

export interface TrackResponse {
    data: Track[];
    next: string;
    total: number;
}
