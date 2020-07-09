import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  private URL_API= 'http://localhost:3000/api/users'
  constructor(private http: HttpClient) { }
  
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

  putProfile(user: User) {
    return this.http.put(this.URL_API + `/perfiles/${user._id}`, user);
  }
  deleteUser(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
  hacerAdmin(_id:  String){
    return this.http.get(this.URL_API + `/hacerAdmin/${_id}`);
  }
  sacarAdmin(_id: String){
    return this.http.get(this.URL_API + `/sacarAdmin/${_id}`);
  }
  habilitar(_id: String){
    return this.http.get(this.URL_API + `/habilitar/${_id}`);
  }
  ascender(_id: String) {
    return this.http.get(this.URL_API + `/ascender/${_id}`);
  }
  descender(_id: String) {
    return this.http.get(this.URL_API + `/descender/${_id}`);
  }
}
