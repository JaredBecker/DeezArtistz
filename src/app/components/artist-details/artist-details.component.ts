import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map, Observable, shareReplay } from 'rxjs';

@Component({
    selector: 'app-artist-details',
    templateUrl: './artist-details.component.html',
})
export class ArtistDetailsComponent implements OnInit {
    public $route!: Observable<string>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    public ngOnInit(): void {
        // Storing route params observable so it can be passed to other components
        this.$route = this.route.paramMap.pipe(
            map((paramMap) => {
                const id = paramMap.get('id') ?? '';

                if (!id) {
                    this.router.navigateByUrl('/not-found', { skipLocationChange: true });
                }

                return id;
            }),
            shareReplay(1),
        );
    }
}
