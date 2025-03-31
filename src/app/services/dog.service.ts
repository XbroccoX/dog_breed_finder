import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

export interface DogBreeds {
  [key: string]: string[];
}

export interface FavoriteImage {
  url: string;
  breed: string;
  addedAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class DogService {
  URL = 'https://dog.ceo/api';
  private readonly FAVORITES_KEY = 'dog-favorites';

  constructor(private http: HttpClient) {}

  // GET LIST of ALL breeds
  getAllBreeds(): Observable<any> {
    return this.http
      .get<{ message: DogBreeds }>(`${this.URL}/breeds/list/all`)
      .pipe(map((response) => response.message));
  }

  // GET IMAGES by breed
  getBreedImages(breed: string, subBreed?: string): Observable<string[]> {
    const breedPath = subBreed ? `${breed}/${subBreed}` : breed;
    return this.http
      .get<{ message: string[] }>(`${this.URL}/breed/${breedPath}/images`)
      .pipe(map((response) => response.message));
  }

  // #region FAVORITES

  // Metodo que obtengo los favoritos desde el localStorage
  getFavorites(): FavoriteImage[] {
    const favorites = localStorage.getItem(this.FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  }
  // Agrego un nuevo favorito al localStorage
  addToFavorites(url: string, breed: string): void {
    const favorites = this.getFavorites();
    if (!favorites.some((fav) => fav.url === url)) {
      favorites.push({ url, breed, addedAt: Date.now() });
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    }
  }
  // Elimino un favorito del localStorage
  removeFromFavorites(url: string): void {
    const favorites = this.getFavorites().filter((fav) => fav.url !== url);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }
  // Verifico si un favorito existe en el localStorage
  isFavorite(url: string): boolean {
    return this.getFavorites().some((fav) => fav.url === url);
  }
}
