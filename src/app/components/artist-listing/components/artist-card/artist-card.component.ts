import { Component, Input } from '@angular/core';

import { Artist } from 'src/app/models/artist.model';

@Component({
    selector: 'app-artist-card',
    templateUrl: './artist-card.component.html',
})
export class ArtistCardComponent {
    @Input() artist!: Artist;
}
