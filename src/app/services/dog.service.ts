import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface DogBreeds {
  [key: string]: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DogService {

  URL = 'https://dog.ceo/api'

  constructor(
    private http: HttpClient
  ) { }


  // GET LIST of ALL breeds
  getAllBreeds(): Observable<any> {
    return this.http.get<{message: any}>(`${this.URL}/breeds/list/all`)
      .pipe(
        map(response => response.message));
  }





}
