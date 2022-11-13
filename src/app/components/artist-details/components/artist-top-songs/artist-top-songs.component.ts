import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Observable, of, Subscription, switchMap } from 'rxjs';

import { Track } from 'src/app/models/track.model';
import { TrackResponse } from 'src/app/models/track-response.interface';
import { ArtistDetailsService } from 'src/app/services/artist-details.service';

@Component({
    selector: 'app-artist-top-songs',
    templateUrl: './artist-top-songs.component.html',
})
export class ArtistTopSongsComponent implements OnInit, OnDestroy {
    @Input() $route!: Observable<string>;

    @ViewChild('audio_element', { static: true })
    public audio_element!: ElementRef<HTMLAudioElement>;

    public top_songs: Track[] = [];
    public loading_top_songs: boolean = true;
    public playing_song: boolean = false;
    public current_audio_clip!: string;
    public placeholders: any[] = new Array(5);

    private top_songs_sub?: Subscription;


    constructor(
        private artistDetailsService: ArtistDetailsService
    ) { }

    public ngOnInit(): void {
        this.top_songs_sub = this.$route
            .pipe(
                switchMap((id) => {
                    this.loading_top_songs = true;

                    if (+id) {
                        return this.artistDetailsService.getArtistsTopSongsByID(+id);
                    } else {
                        return of({} as TrackResponse);
                    }
                })
            )
            .subscribe({
                next: (track_response) => {
                    if (track_response.data) {
                        this.top_songs = track_response.data;
                    }

                    this.loading_top_songs = false;
                },
                error: () => this.loading_top_songs = false,
            })
    }

    public ngOnDestroy(): void {
        this.top_songs_sub?.unsubscribe();
    }

    public playSongPreview(url: string): void {
        if (!this.playing_song) {
            this.initAudioEl(url);
            this.current_audio_clip = url;
            this.audio_element.nativeElement.play();
            this.playing_song = true;
        } else {
            if (url === this.current_audio_clip) {
                this.audio_element.nativeElement.pause();
                this.playing_song = false;
            } else {
                this.initAudioEl(url);
                this.audio_element.nativeElement.play();
                this.current_audio_clip = url;
                this.playing_song = true;
            }
        }
    }

    private initAudioEl(url: string): void {
        this.audio_element.nativeElement.src = url;
        this.audio_element.nativeElement.load();
    }
}
