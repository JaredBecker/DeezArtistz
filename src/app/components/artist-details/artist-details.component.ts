import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map, Observable, of, shareReplay, Subscription, switchMap, tap, throwError } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { ArtistDetailsService } from 'src/app/services/artist-details.service';

@Component({
    selector: 'app-artist-details',
    templateUrl: './artist-details.component.html',
    styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit, OnDestroy {
    public artist?: Artist;
    public loading_artist: boolean = true;

    private artist_sub?: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private artistDetailsService: ArtistDetailsService
    ) { }

    public ngOnInit(): void {
        const $route: Observable<string> = this.route.paramMap.pipe(
            map((paramMap) => {
                const id = paramMap.get('id') ?? '';

                if (!id) {
                    this.router.navigateByUrl(
                        '/not-found',
                        { skipLocationChange: true }
                    );
                }

                return id;
            }),
            shareReplay(1),
        );

        this.artist_sub = $route
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
