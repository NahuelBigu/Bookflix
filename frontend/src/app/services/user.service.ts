import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL_API= 'http://localhost:3000/api'
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

  deleteUser(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
