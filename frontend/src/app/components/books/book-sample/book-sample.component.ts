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

  book: Book;

  constructor(private ruta: ActivatedRoute, private router: Router, private bookService: BookService, private authService: AuthService) {
    this.ruta.params.subscribe(params => {
      this.bookService.getBook(params['id'])
        .subscribe(data => {
          this.book= data as Book;
        });
    })
   }

  ngOnInit(): void {
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

}
