import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ArtistListingService } from 'src/app/services/artist-listing.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    public search = new FormControl('');

    constructor(
        private router: Router,
    ) { }

    /**
     * Searches phrase when user presses enter
     *
     * @param event Keydown event
     */
    public onSearchArtistsEnter(event: KeyboardEvent): void {
        if (event?.key === 'Enter' && this.search.value !== '') {
            this.router.navigateByUrl(`/search/${encodeURI(this.search.value)}`);
        }
        // TODO: add toaster and give feedback
    }

    /**
     * Searches phrase when user clicks search button
     *
     * @param event Keydown event
     */
    public onSearchArtistsClick(): void {
        if (this.search.value !== '') {
            this.router.navigateByUrl(`/search/${encodeURI(this.search.value)}`);
        }
        // TODO: add toaster and give feedback
    }
}
