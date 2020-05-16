import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  

  private URL_API= 'http://localhost:3000/api/noticias'
  constructor(private http: HttpClient) { }

  postNoticia(noticia: Noticia) {
    return this.http.post(this.URL_API, noticia);
  }
  
  getNoticia(_id: string) {
    return this.http.get<Noticia>(this.URL_API + `/${_id}`);
  }

  getNoticias() {
    return this.http.get(this.URL_API);
  }

  putNoticia(noticia: Noticia) {
    return this.http.put(this.URL_API + `/${noticia._id}`, noticia);
  }

  deleteNoticia(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  activateNoticia(_id: String) {
    return this.http.get(this.URL_API + `/activarnoticia/${_id}`);
  }
}
