import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ArtistListingComponent } from './components/artist-listing/artist-listing.component';
import { ArtistCardComponent } from './components/artist-listing/components/artist-card/artist-card.component';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ArtistInfoComponent } from './components/artist-details/components/artist-info/artist-info.component';
import { ArtistTopSongsComponent } from './components/artist-details/components/artist-top-songs/artist-top-songs.component';
import { ArtistAlbumsComponent } from './components/artist-details/components/artist-albums/artist-albums.component';
import { ArtistCardPlaceholderComponent } from './components/artist-listing/components/artist-card-placeholder/artist-card-placeholder.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { ArtistInfoPlaceholderComponent } from './components/artist-details/components/artist-info-placeholder/artist-info-placeholder.component';
import { ArtistTopSongsPlaceholderComponent } from './components/artist-details/components/artist-top-songs-placeholder/artist-top-songs-placeholder.component';
import { ArtistAlbumsPlaceholderComponent } from './components/artist-details/components/artist-albums-placeholder/artist-albums-placeholder.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ArtistListingComponent,
        ArtistCardComponent,
        ArtistDetailsComponent,
        NotFoundComponent,
        ArtistInfoComponent,
        ArtistTopSongsComponent,
        ArtistAlbumsComponent,
        ArtistCardPlaceholderComponent,
        TimeFormatPipe,
        ArtistInfoPlaceholderComponent,
        ArtistTopSongsPlaceholderComponent,
        ArtistAlbumsPlaceholderComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
