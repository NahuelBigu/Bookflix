import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { User, LoginResponse } from '../../others/interfaces';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL= 'http://localhost:3000/api'
  constructor(private http: HttpClient, private router: Router) { }

  signUp(user){
    return this.http.post<User>(this.URL+ '/signup', user);
  }
  signIn(user): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.URL+ '/signin', user);
  }
  
  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

}


