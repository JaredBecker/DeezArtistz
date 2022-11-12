import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, shareReplay, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Artist } from '../models/artist.model';
import { TrackResponse } from '../models/track-response.interface';

@Injectable({
    providedIn: 'root',
})
export class ArtistDetailsService {
    private proxy_url: string = environment.proxy_url ?? '';
    private api_url: string = environment.api_url ?? '';
    private production_mode: boolean = environment.production;

    private request_url: string = this.production_mode ?
        `${this.api_url}` :
        `${this.proxy_url}${this.api_url}`;

    private artist_stream_map = new Map<number, Observable<Artist>>();
    private artist_top_songs_stream_map = new Map<number, Observable<TrackResponse>>();

    constructor(
        private http: HttpClient,
    ) { }

    public getArtistByID(id: number) {
        if (!this.artist_stream_map.has(id)) {
            this.storeArtistStream(id);
        }

        const stream = this.artist_stream_map.get(id);

        if (!stream) {
            return throwError(() => new Error('No stream found'));
        }

        return stream;
    }

    public getArtistsTopSongsByID(id: number) {
        if (!this.artist_top_songs_stream_map.has(id)) {
            this.storeArtistsTopSongsStream(id);
        }

        const stream = this.artist_top_songs_stream_map.get(id);

        if (!stream) {
            return throwError(() => new Error('No stream found'));
        }

        return stream;
    }

    public getArtistStream(id: number) {
        return this.http
            .get<Artist>(`${this.request_url}/artist/${id}`)
            .pipe(
                shareReplay(1)
            );
    }

    public getArtistsTopSongsStream(id: number) {
        return this.http
            .get<TrackResponse>(`${this.request_url}/artist/${id}/top`)
            .pipe(
                shareReplay(1)
            );
    }

    private storeArtistStream(id: number): void {
        const $artist_stream = this.getArtistStream(id);

        this.artist_stream_map.set(id, $artist_stream);
    }

    private storeArtistsTopSongsStream(id: number): void {
        const $artist_stream = this.getArtistsTopSongsStream(id);

        this.artist_top_songs_stream_map.set(id, $artist_stream);
    }


}
