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

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ArtistListingComponent,
        ArtistCardComponent,
        ArtistDetailsComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
