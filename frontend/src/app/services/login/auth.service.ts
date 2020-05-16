import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  

  selectedUser: User;

  private localStorageService;
  private currentToken : String = null;
  private URL_API= 'http://localhost:3000/api/users'
  constructor(private http: HttpClient, private router: Router) {

    this.localStorageService = localStorage;
    this.currentToken = this.loadSessionData();
  
   }

  
  setCurrentSession(session): void {
    this.currentToken = session.token;
    this.localStorageService.setItem('currentUser', JSON.stringify(session.token));
    this.localStorageService.setItem('user', JSON.stringify(session.user));
  }
  loadSessionData(): String{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ?  JSON.parse(sessionStr) : null;
  }
  getCurrentSession() {
    return this.currentToken;
  }
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.localStorageService.removeItem('user');
    this.currentToken = null;
  }



  getCurrentUser3() {
    return this.http.get<User>(this.URL_API+ '/getUserByToken/'+ this.getCurrentToken());
  }


  getCurrentUser(): User {
    var user: User=new User;
    var ruta=this.URL_API+ '/getUserByToken/'+ this.getCurrentToken();
    this.http.get<User>(ruta).subscribe((data) => {
      user._id =  data._id; // fijarse si hay que poner dato a dato
      user.creditCardNumber = data.creditCardNumber;
      user.creditCardName = data.creditCardName;
      user.creditCardMM = data.creditCardMM;
      user.creditCardYY = data.creditCardYY;
      user.creditCardCVV= data.creditCardCVV;
      user.email = data.email;
      user.plan = data.plan;
      user.password = data.password;
      user.profiles= data.profiles;
      user.createdAt=data.createdAt;
     
   });
    
    return (user);
  }
  getCurrentUser2() {
    return this.localStorageService.getItem('user');
  }
  
  isAdmin(): boolean {
    return true;
    if (this.isAuthenticated()){
      //console.log(this.localStorageService.getItem('user').plan);
      return this.localStorageService.getItem('user').plan === 0;
    }
    return false
  }
  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null)&&(this.verifyToken()) ? true : false;
  }
  verifyToken() {
    return this.http.get(this.URL_API + `/verifyToken/${this.getCurrentToken()}`);
  }
  
  getCurrentToken(): String {
    return this.getCurrentSession();
    
  }
  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['']);
  }

  putUser(anUser: User) {
    console.log(anUser);
    return this.http.put(this.URL_API + `/${this.getCurrentUser()._id}`, anUser);
  }


  signUp(user) {
    return this.http.post(this.URL_API+ '/signup', user);
  }
  signIn(user){
    return this.http.post(this.URL_API+ '/signin', user);
  }




}


