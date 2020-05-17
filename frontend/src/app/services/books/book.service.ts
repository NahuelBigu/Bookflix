import { Injectable } from '@angular/core';
import { Book } from '../../models/book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly URL_API= 'http://localhost:3000/api/books';
  
  constructor(private http: HttpClient) { }

  getBooks(){
    return this.http.get(this.URL_API);
  }

  postBook(book: Book) {
    return this.http.post(this.URL_API, book);
  }

  getBook(_id: string){
    return this.http.get(this.URL_API + `/${_id}`);
  }

  putBook(book: Book){
    return this.http.put(this.URL_API + `/${book._id}`, book);
  }

  deleteBook(book: Book){
    book.active=false;
    return this.http.put(this.URL_API + `/${book._id}`, book);
  }
}
