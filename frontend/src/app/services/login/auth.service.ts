import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { User } from '../../models/user'
import { LoginResponse } from '../../others/interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  selectedUser: User;

  private URL_API= 'http://localhost:3000/api'
  constructor(private _userService:UserService,private http: HttpClient, private router: Router) { }

  signUp(user): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.URL_API+ '/signup', user);
  }
  signIn(user){
    return this.http.post<any>(this.URL_API+ '/signin', user);
  }
  
  loggedIn(){
    return this._userService.token != localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this._userService.user=null;
    this.router.navigate(['']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  postUser(user: User) {
    return this.http.post(this.URL_API, user);
  }

  getUser(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`);
  }

  getUsers() {
    return this.http.get(this.URL_API);
  }

  putUser(user: User) {
    return this.http.put(this.URL_API + `/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}


