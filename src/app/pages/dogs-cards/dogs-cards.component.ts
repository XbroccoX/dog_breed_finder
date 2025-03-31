import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DogBreeds, DogService } from '../../services/dog.service';
// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-dogs-cards',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // UI COMPONENTS
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './dogs-cards.component.html',
  styleUrl: './dogs-cards.component.scss',
})
export class DogsCardsComponent implements OnInit {
  breeds: DogBreeds = {};

  searchTerm: string = '';
  filteredBreeds: Array<{
    name: string;
    subBreed?: string;
    displayName: string;
  }> = [];

  images: string[] = [];
  randomImage: string | null = null;
  currentBreedName: string = '';

  loading: boolean = false;
  hover: boolean = false;

  constructor(private _dogService: DogService) {}

  ngOnInit() {
    this.loadBreeds();
  }

  // Metodo que trae todas las razas de perros
  loadBreeds() {
    this._dogService.getAllBreeds().subscribe((breeds) => {
      this.breeds = breeds;
    });
  }
  // Metodo para buscar por searchinput
  onSearch() {
    if (!this.searchTerm) {
      this.filteredBreeds = [];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredBreeds = [];

    //recorrer las razas de perros y filtrar por el nombre
    Object.entries(this.breeds).forEach(([breed, subBreeds]) => {
      if (breed.toLowerCase().includes(searchLower)) {
        // Si es la raza principal
        if (subBreeds.length === 0) {
          // Si no hay subrazas, agrego la raza,
          this.filteredBreeds.push({
            name: breed,
            displayName: breed.charAt(0).toUpperCase() + breed.slice(1),
          });
        } else {
          subBreeds.forEach((subBreed) => {
            this.filteredBreeds.push({
              name: breed,
              subBreed: subBreed,
              displayName: `${
                subBreed.charAt(0).toUpperCase() + subBreed.slice(1)
              } ${breed}`,
            });
          });
        }
      }
      // si busca por subrazas, agrego la subraza y la raza
      subBreeds.forEach((subBreed) => {
        if (subBreed.toLowerCase().includes(searchLower)) {
          this.filteredBreeds.push({
            name: breed,
            subBreed: subBreed,
            displayName: `${
              subBreed.charAt(0).toUpperCase() + subBreed.slice(1)
            } ${breed}`,
          });
        }
      });
    });
  }

  // Metodo para ver
  selectBreed(breed: string, subBreed?: string) {
    this.loading = true;
    this.searchTerm = '';
    this.filteredBreeds = [];
    // SI ES UNA SUBRAZA, SE MUESTRA LA SUBRAZA Y LA RAZA
    // SI NO, SOLO SE MUESTRA LA RAZA
    this.currentBreedName = subBreed
      ? `${subBreed.charAt(0).toUpperCase() + subBreed.slice(1)} ${breed}`
      : breed.charAt(0).toUpperCase() + breed.slice(1);

    this._dogService.getBreedImages(breed, subBreed).subscribe({
      next: (images) => {
        this.images = images;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  surpriseMe() {
    this.loading = true;
    this._dogService.getRandomImage().subscribe({
      next: (image) => {
        this.randomImage = image;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  // Metodo para agregar un favorito
  isFavorite(url: string): boolean {
    return this._dogService.isFavorite(url);
  }

  // Metodo para ir a favoritos
  toggleFavorite(url: string, event: MouseEvent) {
    event.stopPropagation();
    if (this.isFavorite(url)) {
      this._dogService.removeFromFavorites(url);
    } else {
      this._dogService.addToFavorites(url, this.currentBreedName);
    }
  }
}
