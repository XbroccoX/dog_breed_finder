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
    this._dogService.favorites$.subscribe((fav) => {
      this.favorites = fav;
    });
  }

  removeFavorite(url: string, event: MouseEvent) {
    event.stopPropagation();
    this._dogService.removeFromFavorites(url);
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

}
