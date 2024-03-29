import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../user.service';
import { Profile } from 'src/app/models/profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  selectedUser: User;

  private localStorageService;
  private currentToken : String = null;
  private URL_API= 'http://localhost:3000/api/users'
  constructor(private http: HttpClient, private router: Router , private  userService:UserService) {

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
    this.actualizarPerfil();
    this.localStorageService.removeItem('currentUser');
    this.localStorageService.removeItem('user');
    this.localStorageService.removeItem('profile');
    this.currentToken = null;
  }



  getCurrentUser3() {
    return this.http.get<User>(this.URL_API+ '/getUserByToken/'+ this.getCurrentToken());
  }

  actualizarUser(): User{
    var user: User=new User;
    this.getCurrentUser3().subscribe((data) => {
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
      user.photo=data.photo;
      user.active=data.active;
        this.setCurrentUser(user);
    });
    
    return (user);
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
      user.photo=data.photo;
      user.active=data.active;
   });
    
    return (user);
  }
  getCurrentUser2() {
    return this.localStorageService.getItem('user');
  }
  
  setCurrentUser(user){
    this.localStorageService.setItem('user', JSON.stringify(user));
  }
  isAdmin(): boolean {
   
    if (this.isAuthenticated()){
      var values = JSON.parse(localStorage.getItem("user"));
      return values.plan == 0;
    }
    return false
  }
  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null)&&(this.verifyToken()) ? true : false;
  }

  isSelectProfile() {
    return (this.getProfile() != null) ? true : false;
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

  putUser(anUser) {
    return this.http.put(this.URL_API + `/${anUser.user._id}`, anUser);
  }
  putUser2(anUser) {
    return this.http.put(this.URL_API + `/${anUser._id}`, anUser);
  }


  signUp(user) {
    return this.http.post(this.URL_API+ '/signup', user);
  }
  signIn(user){
    return this.http.post(this.URL_API+ '/signin', user);
  }

  getProfiles(): Profile[] {
    var a = this.getCurrentUser2();
    var r=  JSON.parse(a);
    return r['profiles'] ;  
  }

  setProfile(profile: Profile){
    this.localStorageService.setItem('profile', JSON.stringify(profile));
  }
  getProfile(): Profile {
    return JSON.parse(this.localStorageService.getItem('profile')) as Profile;
  }

  actualizarPerfil() {
    var a = this.getCurrentUser2();
    var user=  JSON.parse(a) as User;
    var p= this.getProfile();
    if (p) {
      var profilePos = user.profiles.map(function(e) { return e._id; }).indexOf(p._id);
      if (profilePos > -1) {
        user.profiles.splice(profilePos,1,p);
      }
      this.userService.putProfile(user).subscribe();
    }
    this.setCurrentUser(user);
  }
}


