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

  // STATE MANAGEMENT
  private favoritesSubject = new BehaviorSubject<FavoriteImage[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

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
  // Agrego un nuevo favorito al localStorage
  addToFavorites(url: string, breed: string): void {
    const current = this.favoritesSubject.value;
    if (!current.some((fav) => fav.url === url)) {
      const updated = [...current, { url, breed, addedAt: Date.now() }];
      this.favoritesSubject.next(updated);
    }
  }
  // Elimino un favorito del localStorage
  removeFromFavorites(url: string): void {
    const updated = this.favoritesSubject.value.filter(
      (fav) => fav.url !== url
    );
    this.favoritesSubject.next(updated);
  }
  // Verifico si un favorito existe en el localStorage
  isFavorite(url: string): boolean {
    return this.favoritesSubject.value.some((fav) => fav.url === url);
  }
}
