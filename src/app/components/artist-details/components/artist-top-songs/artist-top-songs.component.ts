import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription, switchMap, throwError } from 'rxjs';

import { Track } from 'src/app/models/track.model';
import { ArtistDetailsService } from 'src/app/services/artist-details.service';

@Component({
    selector: 'app-artist-top-songs',
    templateUrl: './artist-top-songs.component.html',
})
export class ArtistTopSongsComponent implements OnInit, OnDestroy {
    @Input() $route!: Observable<string>;

    public top_songs: Track[] = [];
    public loading_top_songs: boolean = true;
    public placeholders: any[] = new Array(5);

    private top_songs_sub?: Subscription;

    constructor(
        private artistDetailsService: ArtistDetailsService
    ) { }

    // TODO: add in audio tag so you can play track preview

    public ngOnInit(): void {
        this.top_songs_sub = this.$route
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
    }

    public ngOnDestroy(): void {
        this.top_songs_sub?.unsubscribe();
    }

}
