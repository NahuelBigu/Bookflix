import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book';
import { BookService } from '../../../services/books/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/login/auth.service';
import { Comentario } from '../../../models/comentario';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Profile } from '../../../models/profile';
import { element } from 'protractor';

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
  leyendo=false;
  comentarios=new Array<Comentario>();
  comentario: Comentario = new Comentario;
  perfil: Profile;
  puedeComentar: boolean;
  comentarioStringify: string;

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
          this.leyendo = this.capLeidos != -1 ;
          this.book.comments.forEach(element => {
            let aux = JSON.parse(element as string) as Comentario;
            this.comentarios.push(aux);
          })
          this.puedeComentar = this.puedeCalificar();
        });
    })
    this.perfil = authService.getProfile();
    
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
    this.leyendo=true;
  }
  

  
  leido(i){
    return (this.termine)||(this.capLeidos >= i+1)
  }
  agregarFav(){
    this.fav = this.bookService.setFav(this.book._id);
  } 
  terminar(){
    this.termine =this.bookService.setHistory(this.book._id);
    this.leyendo=false;
  }
  sacarDelHistorial(){
    this.termine =this.bookService.removeHistory(this.book._id);
    this.capLeidos=0;
  }
  sacarDeLeidos(){
    this.bookService.removeReading(this.book._id);
    this.capLeidos=0;
    this.leyendo=false;
 }

 existeMiComentario(){
  var aux = this.comentarios.find(element => element.perfil==this.perfil._id);
  return aux ? true : false;
 }

 puedeCalificar(){
   if(this.termine && !this.existeMiComentario()){
    return true
   }
   return false;
 }

 like(){
   this.comentario.like=true;
 }

 dislike(){
   this.comentario.like=false;
 }

 calificar(){
  this.comentario.perfil=this.perfil._id;
  this.comentario.active=true;
  this.comentarioStringify= JSON.stringify(this.comentario);
  this.book.comments.push(this.comentarioStringify);
  this.bookService.putBook(this.book).subscribe(params =>{
    this.book.comments.forEach(element => {
      let aux = JSON.parse(element as string) as Comentario;
      this.comentarios.push(aux);
    })
    this.puedeComentar = this.puedeCalificar();
  })
 }
}
