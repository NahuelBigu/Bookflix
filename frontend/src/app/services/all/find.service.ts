import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FindService {
  private URL_API= 'http://localhost:3000/api/all'
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.URL_API);
  }

  search(find){
    return this.http.get(this.URL_API+'/search/'+find);
  }
}
