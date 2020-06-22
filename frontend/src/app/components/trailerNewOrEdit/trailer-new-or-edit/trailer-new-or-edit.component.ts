import { Component, OnInit } from '@angular/core';
import { Trailer } from 'src/app/models/trailer';
import { TrailerService } from 'src/app/services/books/trailer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/books/book.service';
declare var $:any;

@Component({
  selector: 'app-trailer-new-or-edit',
  templateUrl: './trailer-new-or-edit.component.html',
  styleUrls: ['./trailer-new-or-edit.component.css']
})
export class TrailerNewOrEditComponent implements OnInit {
  error: String='';
  trailer:Trailer= new Trailer;
  book: Book;
  trailerString: String;
  constructor(private ruta: ActivatedRoute, private router: Router, private bookService: BookService, private authService: AuthService) { 
    this.ruta.params.subscribe(params => {
      this.bookService.getBook(params['id'])
        .subscribe(data => {
          this.book = data as Book;
        });
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.trailer.createdAt=new Date;
    if (!this.trailer.title) return this.error='Se necesita especificar el titulo del trailer';
    if (!this.trailer.video || !this.trailer.text) return this.error='Se necesita especificar el url del video o texto del cuerpo';
    this.trailerString=JSON.stringify(this.trailer);
    this.book.trailers.push(this.trailerString);
    this.bookService.putBook(this.book).subscribe();
    this.router.navigate(['/books/trailer/',this.book._id]);
  }

}
