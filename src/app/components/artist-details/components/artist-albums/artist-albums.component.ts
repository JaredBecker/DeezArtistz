import { Component, Input, OnChanges, OnDestroy } from '@angular/core';

import { Observable, Subscription, switchMap, throwError } from 'rxjs';

import { Album } from 'src/app/models/album.model';
import { ArtistDetailsService } from 'src/app/services/artist-details.service';

@Component({
    selector: 'app-artist-albums',
    templateUrl: './artist-albums.component.html',
})
export class ArtistAlbumsComponent implements OnChanges, OnDestroy {
    @Input() $route!: Observable<string>;

    public albums?: Album[];
    public loading_albums: boolean = true;

    private albums_sub?: Subscription;

    constructor(
        private artistDetailsService: ArtistDetailsService,
    ) { }

    public ngOnChanges(): void {
        // If new changes come in kill old subscription
        this.albums_sub?.unsubscribe();

        this.albums_sub = this.$route
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
        this.albums_sub?.unsubscribe();
    }
}
