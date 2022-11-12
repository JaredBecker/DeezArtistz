import { Component, Input, OnChanges, OnDestroy } from '@angular/core';

import { Observable, Subscription, switchMap, throwError } from 'rxjs';

import { Artist } from 'src/app/models/artist.model';
import { ArtistDetailsService } from 'src/app/services/artist-details.service';

@Component({
    selector: 'app-artist-info',
    templateUrl: './artist-info.component.html',
})
export class ArtistInfoComponent implements OnChanges, OnDestroy {
    @Input() $route!: Observable<string>;

    public artist?: Artist;
    public loading_artist: boolean = true;

    private artist_sub?: Subscription;

    constructor(
        private artistDetailsService: ArtistDetailsService
    ) { }

    public ngOnChanges(): void {
        // If new changes come in kill old subscription
        this.artist_sub?.unsubscribe();

        this.artist_sub = this.$route
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
    }

    public ngOnDestroy(): void {
        this.artist_sub?.unsubscribe();
    }
}
