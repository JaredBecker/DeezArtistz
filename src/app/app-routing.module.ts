import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';

import { ArtistListingComponent } from './components/artist-listing/artist-listing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: ArtistListingComponent,
        pathMatch: 'full',
    },
    {
        path: 'search/:search_phrase',
        children: [
            {
                path: '',
                component: ArtistListingComponent,
            }
        ]
    },
    {
        path: 'artist/:id',
        component: ArtistDetailsComponent,
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
