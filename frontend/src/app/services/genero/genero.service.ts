import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genero } from '../../models/genero';


@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  

  private URL_API= 'http://localhost:3000/api/generos'
  constructor(private http: HttpClient) { }

  postGenero(genero: Genero) {
    return this.http.post(this.URL_API, genero);
  }
  
  getGenero(_id: string) {
    return this.http.get<Genero>(this.URL_API + `/${_id}`);
  }

  getGeneros() {
    return this.http.get(this.URL_API);
  }

  putGenero(genero: Genero) {
    return this.http.put(this.URL_API + `/${genero._id}`, genero);
  }

  deleteGenero(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`).subscribe();
  }

  activateGenero(_id: String) {
    return this.http.get(this.URL_API + `/activargenero/${_id}`).subscribe();
  }
}
