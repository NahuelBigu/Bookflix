import { Injectable } from '@angular/core';
import { Book } from '../../models/book';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  
  readonly URL_API = 'http://localhost:3000/api/books';
  private localStorageService;
  constructor(private http: HttpClient , private authService:AuthService) { this.localStorageService = localStorage; }
  getBooks() {
    return this.http.get(this.URL_API + `/allBooks`);
  }

  getActiveBooks() {
    return this.http.get(this.URL_API);
  }

  postBook(book: Book) {
    return this.http.post(this.URL_API, book);
  }

  getBook(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`);
  }

  putBook(book: Book) {
    return this.http.put(this.URL_API + `/${book._id}`, book);
  }

  deleteBook(book: Book) {
    book.active = false;
    return this.http.delete(this.URL_API + `/${book._id}`);
  }
  habilitar(book: Book) {
    book.active = true;
    return this.http.get(this.URL_API + `/habilitar/${book._id}`);
  }

  setHistory(_id: string) {
    var profile = JSON.parse(this.localStorageService.getItem('profile'));
    var esta = profile.history.indexOf(_id);
    if (esta > -1) {
      profile.history.splice(esta, 1);
    } else {
      profile.history.push(_id);
      var aux=profile.reading.map(function(e) { return e.bookId; }).indexOf(_id);
      if(aux > -1){
        profile.reading.splice(aux, 1);
      }
    }
    this.localStorageService.setItem('profile', JSON.stringify(profile));
    

   return true
  }
  removeReading(_id: string){
    var profile = JSON.parse(this.localStorageService.getItem('profile'));
    var aux=profile.reading.map(function(e) { return e.bookId; }).indexOf(_id);
    if(aux > -1){
        profile.reading.splice(aux, 1);
    }
    this.localStorageService.setItem('profile', JSON.stringify(profile));
  }
  removeHistory(_id: string) {
    var profile = JSON.parse(this.localStorageService.getItem('profile'));
    var esta = profile.history.indexOf(_id);
    if (esta > -1) {
      profile.history.splice(esta, 1);
    }
    this.localStorageService.setItem('profile', JSON.stringify(profile));
    
    return false;
  }
  
  getCapLeidos(book: Book) {
    var aux = JSON.parse(this.localStorageService.getItem('profile'));
    var cap = -1;
    aux.reading.forEach(element => {
      if (element.bookId == book._id) {
        cap = element.capAct;
      }

    });

    return cap
  }

  setCapLeido(aux) {
    var profile = JSON.parse(this.localStorageService.getItem('profile'));
    var esta = profile.reading.find(element => { return element.bookId == (aux.bookId) });
    if (esta) {
      if (aux.capAct <= esta.capAct) { esta.capAct = aux.capAct - 1 } else { esta.capAct = aux.capAct }
      this.localStorageService.setItem('profile', JSON.stringify(profile));
      return esta.capAct;
    } else {
      profile.reading.push(aux)
      this.localStorageService.setItem('profile', JSON.stringify(profile));
      return esta.capAct;
    }
    
   
   

  }

  setFav(_id: string) {
    var profile = JSON.parse(this.localStorageService.getItem('profile'));
    var esta = profile.favorite.indexOf(_id);
    var aux=true;
    if (esta > -1) {
      profile.favorite.splice(esta, 1);
      aux=false;
    } else {
      profile.favorite.push(_id);
    }
    this.localStorageService.setItem('profile', JSON.stringify(profile));

    return aux
  }
  getFav(_id: string): boolean {
    var profile = JSON.parse(this.localStorageService.getItem('profile'));
    var esta = profile.favorite.indexOf(_id);
    return (esta > -1) ? true : false
  }
  termineLibro(_id: string): boolean {
    var profile = JSON.parse(this.localStorageService.getItem('profile'));
    var esta = profile.history.indexOf(_id);
    return (esta > -1) ? true : false
  }
  
  getActiveBooksReading() {
    var profile = JSON.parse(this.localStorageService.getItem('profile'));
    var books=profile.reading.map(function(e) { return e.bookId; })
    return this.http.post(this.URL_API+"/specific/",books);
  }
  getActiveBooksFavs() {
    var profile = JSON.parse(this.localStorageService.getItem('profile'));
    var books=profile.favorite;
    return this.http.post(this.URL_API+"/specific/",books);
  }
  getActiveBooksHistory() {
    var profile = JSON.parse(this.localStorageService.getItem('profile'));
    var books=profile.history;
    return this.http.post(this.URL_API+"/specific/",books);
  }
  
}
