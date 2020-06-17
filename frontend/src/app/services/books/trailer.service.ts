import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrailerService {
  private URL_API= 'http://localhost:3000/api/trailers'
  constructor(private http: HttpClient) { }

  getTrailers(){
    return this.http.get(this.URL_API);
  }
}
