import { Routes } from '@angular/router';
import { DogsCardsComponent } from './pages/dogs-cards/dogs-cards.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dogs-cards', pathMatch: 'full' },
  { path: 'dogs-cards', component: DogsCardsComponent },
];
