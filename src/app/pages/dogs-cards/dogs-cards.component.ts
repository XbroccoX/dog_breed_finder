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

  // Metodo que trae todas las razas de perros
  loadBreeds() {
    this._dogService.getAllBreeds().subscribe((breeds) => {
      this.breeds = breeds;
    });
  }
  // Metodo para buscar por searchinput
  onSearch(){
    if(!this.searchTerm) {
      this.filteredBreeds = [];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredBreeds = [];

    //recorrer las razas de perros y filtrar por el nombre
    Object.entries(this.breeds).forEach(([breed, subBreeds]) => {
      if(breed.toLowerCase().includes(searchLower)){
        // Si es la raza principal
        if(subBreeds.length === 0){
          // Si no hay subrazas, agrego la raza,
          this.filteredBreeds.push({
            name: breed,
            displayName: breed.charAt(0).toUpperCase() + breed.slice(1)
          });
        } else {
          subBreeds.forEach(subBreed => {
            this.filteredBreeds.push({
              name: breed,
              subBreed: subBreed,
              displayName: `${subBreed.charAt(0).toUpperCase() + subBreed.slice(1)} ${breed}`,
            });
          });
        }
      }
      // si busca por subrazas, agrego la subraza y la raza
      subBreeds.forEach(subBreed => {
        if(subBreed.toLowerCase().includes(searchLower)){
          this.filteredBreeds.push({
            name: breed,
            subBreed: subBreed,
            displayName: `${subBreed.charAt(0).toUpperCase() + subBreed.slice(1)} ${breed}`,
          });
        }
      });
    })
  }





}
