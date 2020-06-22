import { Component, OnInit } from '@angular/core';
import { Trailer } from 'src/app/models/trailer';
import { Book } from 'src/app/models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/books/book.service';
import { AuthService } from 'src/app/services/login/auth.service';

@Component({
  selector: 'app-trailer-edit',
  templateUrl: './trailer-edit.component.html',
  styleUrls: ['./trailer-edit.component.css']
})
export class TrailerEditComponent implements OnInit {

  error: String='';
  trailer:Trailer= new Trailer;
  book: Book;
  trailerString: String;
  i: number;
  constructor(private ruta: ActivatedRoute, private router: Router, private bookService: BookService, private authService: AuthService) { 
    this.ruta.params.subscribe(params => {
      this.bookService.getBook(params['id'])
        .subscribe(data => {
          this.book = data as Book;
          this.i=params['i'];
          this.trailer=JSON.parse(this.book.trailers[this.i] as string) as Trailer;
        });
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    if (!this.trailer.title) return this.error='Se necesita especificar el titulo del trailer';
    this.trailerString=JSON.stringify(this.trailer);
    this.book.trailers[this.i]=this.trailerString;
    this.bookService.putBook(this.book).subscribe();
    this.router.navigate(['/books/trailer/',this.book._id]);
  }

}

