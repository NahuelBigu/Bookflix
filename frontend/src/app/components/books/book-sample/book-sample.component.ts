import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book';
import { BookService } from '../../../services/books/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/login/auth.service';

@Component({
  selector: 'app-book-sample',
  templateUrl: './book-sample.component.html',
  styleUrls: ['./book-sample.component.css']
})
export class BookSampleComponent implements OnInit {
  capLeidos=0;
  fav=true;
  book: Book;
  error: String ='';
  termine=false;

  constructor(private ruta: ActivatedRoute, private router: Router, private bookService: BookService, private authService: AuthService) {
    this.ruta.params.subscribe(params => {
      this.bookService.getBook(params['id'])
        .subscribe(data => {
          this.book= data as Book;
          if ((this.book.active==false)||(new Date(this.book.duedate as string) < (new Date))) {
            this.error="El libro no se encuentra activo en este momento";
          }
          this.capLeidos=this.bookService.getCapLeidos(this.book);
          this.fav=this.bookService.getFav(this.book._id);
          this.termine = this.bookService.termineLibro(this.book._id);
        });
    })
    

   }

  ngOnInit(): void {
  }

  isAdmin(){
    return this.authService.isAdmin();
  }
  verCapitulo(cap){
    var libro={
      bookId: this.book._id,
      capAct: cap+1
    }
    if(this.termine){
      this.sacarDelHistorial();
    }
    this.capLeidos=this.bookService.setCapLeido(libro);
    
  }
  leido(i){
    return (this.termine)||(this.capLeidos >= i+1)
  }
  agregarFav(){
    this.fav = this.bookService.setFav(this.book._id);
  } 
  terminar(){
    this.termine =this.bookService.setHistory(this.book._id);
  }
  sacarDelHistorial(){
    this.termine =this.bookService.removeHistory(this.book._id);
    this.capLeidos=0;
  }
}
