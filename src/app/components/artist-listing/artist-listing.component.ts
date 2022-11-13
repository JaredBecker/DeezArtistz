import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { of, Subscription, switchMap } from 'rxjs';

import { Artist } from 'src/app/models/artist.model';
import { ArtistResponse } from 'src/app/models/artist-response.interface';
import { ArtistListingService } from 'src/app/services/artist-listing.service';

@Component({
    selector: 'app-artist-listing',
    templateUrl: './artist-listing.component.html',
})
export class ArtistListingComponent implements OnInit, OnDestroy {
    public artists: Artist[] = [];
    public loading_artists: boolean = false;
    public placeholders: any[] = Array(18);

    private artists_sub?: Subscription;

    constructor(
        private route: ActivatedRoute,
        private artistListingService: ArtistListingService,
    ) { }

    public ngOnInit(): void {
        this.route.paramMap
            .pipe(
                switchMap((paramMap) => {
                    this.loading_artists = true;

                    const search_phrase = paramMap.get('search_phrase') ?? '';

                    if (search_phrase !== '') {
                        return this.artistListingService.getArtists(search_phrase);
                    } else {
                        return of({} as ArtistResponse)
                    }
                }),
            )
            .subscribe({
                next: (artists_response) => {
                    if (artists_response.data) {
                        this.artists = artists_response.data;
                    }

                    this.loading_artists = false;
                },
                error: () => this.loading_artists = false,
            })
    }

    public ngOnDestroy(): void {
        this.artists_sub?.unsubscribe();
    }
}
