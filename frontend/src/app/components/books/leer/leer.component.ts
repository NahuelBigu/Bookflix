import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/books/book.service';
import { Book } from 'src/app/models/book';
import { DomSanitizer } from '@angular/platform-browser';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';


@Component({
  selector: 'app-leer',
  templateUrl: './leer.component.html',
  styleUrls: ['./leer.component.css']
})
export class LeerComponent implements OnInit {
  book: Book;
  error: string="";
  url: any;
  url2: any;
  cap: number;
  pageVariable: number = 1;
  pageVariableMax: number;
  fin: boolean = false;
  proximoCapitulo: boolean = false;
  capProximo: number = 0;
  constructor(private _sanitizer: DomSanitizer, private ruta: ActivatedRoute, private router: Router, private bookService: BookService) {
    this.ruta.params.subscribe(params => {
      this.bookService.getBook(params['id'])
        .subscribe(data => {
          this.book = data as Book;
          if ((this.book.active == false) || (new Date(this.book.duedate as string) < (new Date))) {
            this.error = "El libro no se encuentra activo en este momento";
          } else {
            if (params['cap'] != "completo") {
              this.cap = (params['cap']) as number;
              this.cap--; // para cordinar con el numero de cap y del arreglo
              if (this.book.chapters[this.cap] != null  ) {
                this.verCapitulo();
                var capAux = this.cap;
                capAux++;
                this.capProximo = -1
                for (let index = capAux; index < this.book.chapters.length; index++) {
                  if (this.book.chapters[index] != null && this.book.chapters[index] != '') {
                    this.capProximo = index + 1;
                    break;
                  }

                }
                if (this.capProximo != -1) {
                  this.proximoCapitulo = true;
                }
                //this.url = this._sanitizer.bypassSecurityTrustResourceUrl("http://localhost:3000/api/pdf/" + this.book.chapters[this.cap]);
                this.url2 = "http://localhost:3000/api/pdf/" + this.book.chapters[this.cap];
              }else{
                this.error = "El capitulo no se encuentra activo en este momento";
              }


            } else {
              //this.url = this._sanitizer.bypassSecurityTrustResourceUrl("http://localhost:3000/api/pdf/" + this.book.bookPDF);
              this.url2 = "http://localhost:3000/api/pdf/" + this.book.bookPDF;
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

  retroceder() {
    if (this.pageVariable > 1) {
      this.pageVariable--
      if (this.fin) {
        this.fin = false;
      }
    }
  }
  avanzar() {
    this.pageVariable++
    if (this.pageVariableMax == this.pageVariable) { this.fin = true }
  }
  callBackFn(pdf: PDFDocumentProxy) {
    //console.log(pdf);
    this.pageVariableMax = pdf['_pdfInfo']['numPages'];
  }

  numberChange() {
    if (this.pageVariable >= this.pageVariableMax) {
      this.fin = true;
    } else {
      this.fin = false;
    }

  }

  verCapitulo() {
    var aux: number = this.cap;
    aux++;
    var libro = {
      bookId: this.book._id,
      capAct: aux
    }
    this.bookService.setCapLeido(libro);
  }


}
