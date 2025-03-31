import { Routes } from '@angular/router';
import { DogsCardsComponent } from './pages/dogs-cards/dogs-cards.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dogs-cards', pathMatch: 'full' },
  { path: 'dogs-cards', component: DogsCardsComponent },
  { path: 'favorites', component: FavoritesComponent },
];
