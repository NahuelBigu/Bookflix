import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Autor } from '../../models/autor';


@Injectable({
  providedIn: 'root'
})
export class AutorService {
  

  private URL_API= 'http://localhost:3000/api/autors'
  constructor(private http: HttpClient) { }

  postAutor(autor: Autor) {
    return this.http.post(this.URL_API, autor);
  }
  
  getAutor(_id: string) {
    return this.http.get<Autor>(this.URL_API + `/${_id}`);
  }

  getAutors() {
    return this.http.get(this.URL_API);
  }

  putAutor(autor: Autor) {
    return this.http.put(this.URL_API + `/${autor._id}`, autor);
  }

  deleteAutor(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`).subscribe();
  }

  activateAutor(_id: String) {
    return this.http.get(this.URL_API + `/activarautor/${_id}`).subscribe();
  }
}