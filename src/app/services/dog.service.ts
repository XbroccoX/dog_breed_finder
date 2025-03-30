import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface DogBreeds {
  [key: string]: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DogService {
  URL = 'https://dog.ceo/api';

  constructor(private http: HttpClient) {}

  // GET LIST of ALL breeds
  getAllBreeds(): Observable<any> {
    return this.http.get<{ message: DogBreeds }>(`${this.URL}/breeds/list/all`)
      .pipe(map((response) => response.message));
  }

  // GET IMAGES by breed
  getBreedImages(breed: string, subBreed?: string): Observable<string[]> {
    const breedPath = subBreed ? `${breed}/${subBreed}` : breed;
    return this.http.get<{ message: string[] }>(`${this.URL}/breed/${breedPath}/images`)
      .pipe(map((response) => response.message));
  }
}
