import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DogBreeds, DogService } from '../../services/dog.service';


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
  ],
  templateUrl: './dogs-cards.component.html',
  styleUrl: './dogs-cards.component.scss',
})
export class DogsCardsComponent {
  breeds: DogBreeds = {};
  searchTerm: string = '';
  images: string[] = [];
  loading: boolean = false;
  currentBreedName: string = '';
  filteredBreeds: Array<{
    name: string;
    subBreed?: string;
    displayName: string;
  }> = [];

  constructor(
    private _dogService: DogService
  ) {}

  ngOnInit() {
    this.loadBreeds();
  }

  loadBreeds() {
    this._dogService.getAllBreeds().subscribe((breeds) => {
      this.breeds = breeds;
    });
  }

}
