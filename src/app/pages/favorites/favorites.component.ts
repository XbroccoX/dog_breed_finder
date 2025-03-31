import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DogService, FavoriteImage } from '../../services/dog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteImage[] = [];

  constructor(private _dogService: DogService, private router: Router) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this._dogService.getFavorites();
  }

  removeFavorite(url: string, event: MouseEvent) {
    event.stopPropagation();
    this._dogService.removeFromFavorites(url);
    this.loadFavorites();
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

  getRelativeTime(timestamp: number): string {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diff = timestamp - Date.now();
    const diffInDays = Math.round(diff / (1000 * 60 * 60 * 24));

    if (Math.abs(diffInDays) < 1) {
      return 'today';
    } else if (Math.abs(diffInDays) === 1) {
      return rtf.format(diffInDays, 'day');
    } else if (Math.abs(diffInDays) < 7) {
      return rtf.format(diffInDays, 'day');
    } else if (Math.abs(diffInDays) < 30) {
      return rtf.format(Math.round(diffInDays / 7), 'week');
    } else if (Math.abs(diffInDays) < 365) {
      return rtf.format(Math.round(diffInDays / 30), 'month');
    }
    return rtf.format(Math.round(diffInDays / 365), 'year');
  }
}
