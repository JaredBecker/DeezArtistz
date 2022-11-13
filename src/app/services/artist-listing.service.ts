import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, shareReplay, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ArtistResponse } from '../models/artist-response.interface';

@Injectable({
    providedIn: 'root'
})
export class ArtistListingService {
    private proxy_url: string = environment.proxy_url ?? '';
    private api_url: string = environment.api_url ?? '';

    private request_url: string = `${this.proxy_url}${this.api_url}`;

    // Setting up maps to store requests that have been made so if the
    // same request comes through I don't have to query the server again
    private artist_stream_map = new Map<string, Observable<ArtistResponse>>();

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Checks if a previous request has been made with the same search phrase and
     * returns that or stores the new request into the map and then returns the stream
     *
     * @param artist The name of the artist to search for
     *
     * @returns Observable of type ArtistResponse
     */
    public getArtists(artist: string): Observable<ArtistResponse> {
        const identifier = artist.toLowerCase();

        if (!this.artist_stream_map.has(identifier)) {
            this.storeArtistStream(identifier);
        }

        const stream = this.artist_stream_map.get(identifier);

        if (!stream) {
            return throwError(() => new Error('No artists stream found'));
        }

        return stream;
    }

    /**
     * Builds artists HTTP request
     *
     * @param artist The name of the artist to search for
     *
     * @returns Observable of type ArtistResponse
     */
    private getArtistStream(artist: string): Observable<ArtistResponse> {
        return this.http
            .get<ArtistResponse>(`${this.request_url}search/artist?q=${artist}`)
            .pipe(
                shareReplay(1)
            );
    }

    /**
     * Stores the artist stream
     *
     * @param identifier The key to use when storing the request
     */
    private storeArtistStream(identifier: string): void {
        const $artist_stream = this.getArtistStream(identifier);
        this.artist_stream_map.set(identifier, $artist_stream);
    }
}
