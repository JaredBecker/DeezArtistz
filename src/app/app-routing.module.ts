import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtistListingComponent } from './components/artist-listing/artist-listing.component';

const routes: Routes = [
    {
        path: '',
        component: ArtistListingComponent,
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
