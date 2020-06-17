import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrailerService {
  constructor(private http: HttpClient) { }

  getTrailers(){
    
  }
}
