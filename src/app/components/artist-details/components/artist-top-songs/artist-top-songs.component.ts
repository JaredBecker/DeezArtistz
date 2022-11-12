import { Component, Input, OnChanges, OnDestroy } from '@angular/core';

import { Observable, Subscription, switchMap, throwError } from 'rxjs';

import { Track } from 'src/app/models/track.model';
import { ArtistDetailsService } from 'src/app/services/artist-details.service';

@Component({
    selector: 'app-artist-top-songs',
    templateUrl: './artist-top-songs.component.html',
})
export class ArtistTopSongsComponent implements OnChanges, OnDestroy {
    @Input() $route!: Observable<string>;

    public top_songs?: Track[];
    public loading_top_songs: boolean = true;

    private top_songs_sub?: Subscription;

    constructor(
        private artistDetailsService: ArtistDetailsService
    ) { }

    public ngOnChanges(): void {
        // If new changes come in kill old subscription
        this.top_songs_sub?.unsubscribe();

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
