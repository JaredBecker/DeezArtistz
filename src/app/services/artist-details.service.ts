import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, shareReplay, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Artist } from '../models/artist.model';
import { AlbumResponse } from '../models/album-response.interface';
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
    private artist_albums_stream_map = new Map<number, Observable<AlbumResponse>>();

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Gets artist info for the provided ID
     *
     * @param id The ID of the artist
     *
     * @returns Observable of artist info
     */
    public getArtistByID(id: number): Observable<Artist> {
        if (!this.artist_stream_map.has(id)) {
            this.storeArtistStream(id);
        }

        const stream = this.artist_stream_map.get(id);

        if (!stream) {
            return throwError(() => new Error('No artist stream found'));
        }

        return stream;
    }

    /**
     * Gets artists top songs for the provided ID
     *
     * @param id The ID of the artist
     *
     * @returns Observable of track response
     */
    public getArtistsTopSongsByID(id: number): Observable<TrackResponse> {
        if (!this.artist_top_songs_stream_map.has(id)) {
            this.storeArtistsTopSongsStream(id);
        }

        const stream = this.artist_top_songs_stream_map.get(id);

        if (!stream) {
            return throwError(() => new Error('No track stream found'));
        }

        return stream;
    }

    /**
     * Gets artists albums songs for the provided ID
     *
     * @param id The ID of the artist
     *
     * @returns Observable of album response
     */
    public getArtistsAlbumsByID(id: number): Observable<AlbumResponse> {
        if (!this.artist_albums_stream_map.has(id)) {
            this.storeArtistsAlbumsStream(id);
        }

        const stream = this.artist_albums_stream_map.get(id);

        if (!stream) {
            return throwError(() => new Error('No album stream found'));
        }

        return stream;
    }

    /**
     * Builds artist HTTP request
     *
     * @param id The ID of the artist to look for
     *
     * @returns Observable of artist info
     */
    private getArtistStream(id: number): Observable<Artist> {
        return this.http
            .get<Artist>(`${this.request_url}/artist/${id}`)
            .pipe(
                shareReplay(1)
            );
    }

    /**
     * Builds top songs HTTP request
     *
     * @param id The ID of the artist
     *
     * @returns Observable of track response
     */
    private getArtistsTopSongsStream(id: number): Observable<TrackResponse> {
        return this.http
            .get<TrackResponse>(`${this.request_url}/artist/${id}/top`)
            .pipe(
                shareReplay(1)
            );
    }

    /**
     * Builds albums HTTP request
     *
     * @param id The ID of the artist
     *
     * @returns Observable of album response
     */
    private getArtistsAlbumsStream(id: number): Observable<AlbumResponse> {
        return this.http
            .get<AlbumResponse>(`${this.request_url}/artist/${id}/albums`)
            .pipe(
                shareReplay(1)
            );
    }

    /**
     * Stores artist stream
     *
     * @param identifier The key to use when storing the request
     */
    private storeArtistStream(identifier: number): void {
        const $artist_stream = this.getArtistStream(identifier);
        this.artist_stream_map.set(identifier, $artist_stream);
    }

    /**
     * Stores top songs stream
     *
     * @param identifier The key to use when storing the request
     */
    private storeArtistsTopSongsStream(identifier: number): void {
        const $track_stream = this.getArtistsTopSongsStream(identifier);
        this.artist_top_songs_stream_map.set(identifier, $track_stream);
    }

    /**
     * Stores albums stream
     *
     * @param identifier The key to use when storing the request
     */
    private storeArtistsAlbumsStream(identifier: number): void {
        const $album_stream = this.getArtistsAlbumsStream(identifier);
        this.artist_albums_stream_map.set(identifier, $album_stream);
    }
}
