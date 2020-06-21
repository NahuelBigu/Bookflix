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
  page: number=1;
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
              this.trailers.push(JSON.parse(element as string) as Trailer);
  
  
            });;
  
          });
      })
    }

  ngOnInit(): void {
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  getVideoIframe(url) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
}

}
