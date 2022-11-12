import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map, Observable, of, shareReplay, Subscription, switchMap, tap, throwError } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Artist } from 'src/app/models/artist.model';
import { Track } from 'src/app/models/track.model';
import { ArtistDetailsService } from 'src/app/services/artist-details.service';

@Component({
    selector: 'app-artist-details',
    templateUrl: './artist-details.component.html',
    styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit, OnDestroy {
    public artist?: Artist;
    public top_songs?: Track[];
    public albums?: Album[];

    public loading_artist: boolean = true;
    public loading_top_songs: boolean = true;
    public loading_albums: boolean = true;

    private artist_sub?: Subscription;
    private top_songs_sub?: Subscription;
    private albums_sub?: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private artistDetailsService: ArtistDetailsService
    ) { }

    public ngOnInit(): void {
        const $route: Observable<string> = this.route.paramMap.pipe(
            map((paramMap) => {
                const id = paramMap.get('id') ?? '';

                if (!id) {
                    this.router.navigateByUrl(
                        '/not-found',
                        { skipLocationChange: true }
                    );
                }

                return id;
            }),
            shareReplay(1),
        );

        this.artist_sub = $route
            .pipe(
                switchMap((id) => {
                    this.loading_artist = true;

                    if (+id) {
                        return this.artistDetailsService.getArtistByID(+id);
                    } else {
                        return throwError(() => new Error(`No artist found with the id: ${id}`));
                    }
                })
            )
            .subscribe({
                next: (artist) => {
                    this.artist = artist;
                    this.loading_artist = false;
                },
                error: () => {
                    this.loading_artist = false;
                }
            })

        this.top_songs_sub = $route
            .pipe(
                switchMap((id) => {
                    this.loading_top_songs = true;

                    if (+id) {
                        return this.artistDetailsService.getArtistsTopSongsByID(+id);
                    } else {
                        return throwError(() => new Error(`No tracks found for artist with the id: ${id}`));
                    }
                })
            )
            .subscribe({
                next: (track_response) => {
                    this.top_songs = track_response.data;
                    this.loading_top_songs = false;
                },
                error: () => {
                    this.loading_top_songs = false;
                }
            })

        this.albums_sub = $route
            .pipe(
                switchMap((id) => {
                    this.loading_albums = true;

                    if (+id) {
                        return this.artistDetailsService.getArtistsAlbumsByID(+id);
                    } else {
                        return throwError(() => new Error(`No albums found for artist with the id: ${id}`));
                    }
                })
            )
            .subscribe({
                next: (album_response) => {
                    this.albums = album_response.data;
                    this.loading_albums = false;
                },
                error: () => {
                    this.loading_albums = false;
                }
            })
    }

    public ngOnDestroy(): void {
        this.artist_sub?.unsubscribe();
        this.top_songs_sub?.unsubscribe();
        this.albums_sub?.unsubscribe();
    }
}
