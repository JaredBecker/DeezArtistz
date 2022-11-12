import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
    firstValueFrom,
    Observable,
    shareReplay,
    Subject,
    throwError
} from 'rxjs';

import { environment } from 'src/environments/environment';
import { ArtistResponse } from '../models/artist-response.interface';

@Injectable({
    providedIn: 'root'
})
export class ArtistListingService {
    private proxy_url: string = environment.proxy_url ?? '';
    private api_url: string = environment.api_url ?? '';
    private production_mode: boolean = environment.production;

    private request_url: string = this.production_mode ?
        `${this.api_url}` :
        `${this.proxy_url}${this.api_url}`;

    private artist_subject = new Subject<ArtistResponse>();

    // Setting up maps to store requests that have been made so if the
    // same request comes through I don't have to query the server again
    private artist_stream_map = new Map<string, Observable<ArtistResponse>>();

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Returns the artist_subject as an observable
     *
     * @returns Observable of type ArtistResponse
     */
    public onSearchArtist(): Observable<ArtistResponse> {
        return this.artist_subject.asObservable();
    }

    /**
     * Checks if a previous request has been made with the same search phrase and
     * returns that or stores the new request into the map and then returns the stream
     *
     * @param artist The name of the artist to search for
     *
     * @returns Observable of type ArtistResponse
     */
    public getArtistStream(artist: string): Observable<ArtistResponse> {
        const identifier = artist.toLowerCase();

        if (!this.artist_stream_map.has(identifier)) {
            this.storeArtistStream(identifier);
        }

        const stream = this.artist_stream_map.get(identifier);

        if (!stream) {
            return throwError(() => new Error('No stream found'));
        }

        return stream;
    }

    /**
     * Queries the Deezer API with the provided artist name
     *
     * @param artist The name of the artist to search for
     *
     * @returns Observable of type ArtistResponse
     */
    public getArtist(artist: string): Observable<ArtistResponse> {
        return this.http
            .get<ArtistResponse>(`${this.request_url}/search/artist?q=${artist}`)
            .pipe(
                shareReplay(1)
            );
    }

    /**
     * Gets the result of the search phrase and emits value to artist_subject
     *
     * @param artist The name of the artist to lookup
     */
    public async onSearch(artist: string): Promise<void> {
        await firstValueFrom(this.getArtistStream(artist)).then(
            response => this.artist_subject.next(response)
        )
    }

    /**
     * Stores the artist stream
     *
     * @param identifier The key to use when storing the request
     */
    private storeArtistStream(identifier: string): void {
        const $artist_stream = this.getArtist(identifier);
        this.artist_stream_map.set(identifier, $artist_stream);
    }
}
