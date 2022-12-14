import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Observable, of, Subscription, switchMap } from 'rxjs';

import { Album } from 'src/app/models/album.model';
import { AlbumResponse } from 'src/app/models/album-response.interface';
import { ArtistDetailsService } from 'src/app/services/artist-details.service';

@Component({
    selector: 'app-artist-albums',
    templateUrl: './artist-albums.component.html',
})
export class ArtistAlbumsComponent implements OnInit, OnDestroy {
    @Input() $route!: Observable<string>;

    public albums: Album[] = [];
    public loading_albums: boolean = true;
    public placeholders: any[] = new Array(18);

    private albums_sub?: Subscription;

    constructor(
        private artistDetailsService: ArtistDetailsService,
    ) { }

    public ngOnInit(): void {
        this.albums_sub = this.$route
            .pipe(
                switchMap((id) => {
                    this.loading_albums = true;

                    if (+id) {
                        return this.artistDetailsService.getArtistsAlbumsByID(+id);
                    } else {
                        return of({} as AlbumResponse);
                    }
                })
            )
            .subscribe({
                next: (album_response) => {
                    if (album_response.data) {
                        this.albums = album_response.data;
                    }

                    this.loading_albums = false;
                },
                error: () => this.loading_albums = false,
            })
    }

    public ngOnDestroy(): void {
        this.albums_sub?.unsubscribe();
    }
}
