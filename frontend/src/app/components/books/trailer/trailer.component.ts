import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/login/auth.service';
import { TrailerService } from 'src/app/services/books/trailer.service';
import { BookService } from 'src/app/services/books/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit {
  book: Book;
  error: String = '';
  trailers: Array<String>;
  constructor(private ruta: ActivatedRoute, private router: Router, private bookService: BookService, private authService: AuthService) {
    this.ruta.params.subscribe(params => {
      this.bookService.getBook(params['id'])
        .subscribe(data => {
          this.book = data as Book;
          this.trailers = this.book.trailers as Array<String>;
        });
    })
  }

  ngOnInit(): void {
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  eliminarTrailer(trailer: String) {
    const index = this.book.trailers.indexOf(trailer, 0);
    if (index > -1) {
      this.book.trailers.splice(index, 1);
    }
    this.bookService.putBook(this.book).subscribe();
  }

}
