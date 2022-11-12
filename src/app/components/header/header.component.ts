import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ArtistService } from 'src/app/services/artist.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    public search = new FormControl('');

    constructor(
        private artistService: ArtistService,
    ) { }

    /**
     * Searches phrase when user presses enter
     *
     * @param event Keydown event
     */
    public onSearchArtistsEnter(event: KeyboardEvent): void {
        if (event?.key === 'Enter') {
            // TODO: add validation to make sure field is filled out first
            this.artistService.onSearch(this.search.value);
        }
    }

    /**
     * Searches phrase when user clicks search button
     *
     * @param event Keydown event
     */
    public onSearchArtistsClick(): void {
        // TODO: add validation to make sure field is filled out first
        this.artistService.onSearch(this.search.value);
    }
}
