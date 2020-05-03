import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { User } from '../../models/user'
import { LoginResponse } from '../../others/interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../user.service';
import { Session } from '../../models/session';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  selectedUser: User;

  private localStorageService;
  private currentSession : Session = null;

  private URL_API= 'http://localhost:3000/api'
  constructor(private _userService:UserService,private http: HttpClient, private router: Router) {

    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  
   }


  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }
  loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }
  getCurrentSession(): Session {
    return this.currentSession;
  }
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }
  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  }
  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }
  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  }
  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }



  signUp(user): Observable<Session>{
    return this.http.post<Session>(this.URL_API+ '/signup', user);
  }
  signIn(user){
    return this.http.post<Session>(this.URL_API+ '/signin', user);
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


