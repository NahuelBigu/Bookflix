import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/books/book.service';
import { Book } from 'src/app/models/book';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-leer',
  templateUrl: './leer.component.html',
  styleUrls: ['./leer.component.css']
})
export class LeerComponent implements OnInit {
  book: Book;
  error: string;
  url: any;
  cap:number;
  constructor(private _sanitizer: DomSanitizer,private ruta: ActivatedRoute, private router: Router, private bookService: BookService) {
    this.ruta.params.subscribe(params => {
      this.bookService.getBook(params['id'])
        .subscribe(data => {
          this.book= data as Book;
          
          if ((this.book.active==false)||(new Date(this.book.duedate as string) < (new Date))) {
            this.error="El libro no se encuentra activo en este momento";
          }else{
            if(params['cap'] != "completo"){
            this.cap=params['cap'];
            this.url=this._sanitizer.bypassSecurityTrustResourceUrl("http://localhost:3000/api/pdf/"+this.book.chapters[this.cap]);
            }else{
              this.url=this._sanitizer.bypassSecurityTrustResourceUrl("http://localhost:3000/api/pdf/"+this.book.bookPDF);
            }
            
          }
        });
    })
   }

  ngOnInit(): void {
  }

  getUrl() {
  
 
    
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.url as string);   
}
}
