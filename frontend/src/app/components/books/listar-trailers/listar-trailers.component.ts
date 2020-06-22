import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/login/auth.service';
import { TrailerService } from 'src/app/services/books/trailer.service';
import { BookService } from 'src/app/services/books/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Trailer } from 'src/app/models/trailer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { transcode } from 'buffer';

@Component({
  selector: 'app-listar-trailers',
  templateUrl: './listar-trailers.component.html',
  styleUrls: ['./listar-trailers.component.css']
})
export class ListarTrailersComponent implements OnInit {

  data: any;
  totalRecords: number;
  page: number = 1;
  book: Book;
  books: Array<Book>;
  error: String = '';
  trailers: Array<any> = new Array<any>();


  constructor(private _sanitizer: DomSanitizer
    , private ruta: ActivatedRoute, private router: Router, private bookService: BookService, private authService: AuthService) {
    this.ruta.params.subscribe(params => {
      this.bookService.getBooks()
        .subscribe(data => {
          this.books = data as Array<Book>;
          this.books.forEach(element => {
            element.trailers.forEach(each => {
              let aux = JSON.parse(each as string) as Trailer;
              var video, results;

              if (aux.video != null && aux.video != "" ) {
                results = aux.video.match('[\\?&]v=([^&#]*)');
                video = (results === null) ? aux.video : results[1];
                aux.video = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video) as string; 
              }
              aux['bookid']= element._id;
              aux['bookname']= element.name;
              this.trailers.push(aux);
            })
          });;
          this.trailers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          this.trailers = this.trailers.slice(0, 10);
        });
    })
  }

  ngOnInit(): void {
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  

}
