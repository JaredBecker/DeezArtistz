import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Artist } from 'src/app/models/artist.model';
import { ArtistListingService } from 'src/app/services/artist-listing.service';

@Component({
    selector: 'app-artist-listing',
    templateUrl: './artist-listing.component.html',
})
export class ArtistListingComponent implements OnInit, OnDestroy {
    public artists: Artist[] = [];

    private artist_sub?: Subscription;

    constructor(
        private artistListingService: ArtistListingService
    ) { }

    public ngOnInit(): void {
        // Listening for results from the search in the header
        this.artist_sub = this.artistListingService
            .onSearchArtist()
            .subscribe({
                next: (res_data) => {
                    this.artists = res_data.data;
                }
            })
    }

    public ngOnDestroy(): void {
        this.artist_sub?.unsubscribe();
    }
}
