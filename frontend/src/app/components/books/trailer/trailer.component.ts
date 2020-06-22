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
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit {
  book: Book;
  error: String = '';
  trailers: Array<Trailer> = new Array<Trailer>();
  constructor(private _sanitizer: DomSanitizer
    , private ruta: ActivatedRoute, private router: Router, private bookService: BookService, private authService: AuthService) {
    this.ruta.params.subscribe(params => {
      this.bookService.getBook(params['id'])
        .subscribe(data => {
          this.book = data as Book;
          this.book.trailers.forEach(element => {
            let aux = JSON.parse(element as string) as Trailer;
            //let aux=trailer.video.lastIndexOf("/");
            //trailer.video= trailer.video.slice(0, aux) + "/embed" +trailer.video.slice(aux);
            //console.log(aux);
            var video, results;

            if (aux.video === null) {
              return '';
            }
            results = aux.video.match('[\\?&]v=([^&#]*)');
            video = (results === null) ? aux.video : results[1];

            aux.video = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video) as string;
            this.trailers.push(aux);


          });;

        });
    })
  }

  ngOnInit(): void {
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  eliminarTrailer(trailer: String) {
    const index = this.book.trailers.indexOf(JSON.stringify(trailer), 0);
    if (index > -1) {
      this.book.trailers.splice(index, 1);
      this.trailers.splice(index, 1);
    }

    this.bookService.putBook(this.book).subscribe();
  }



}
