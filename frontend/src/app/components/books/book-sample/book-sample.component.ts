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
  capLeidos = 0;
  fav = true;
  book: Book;
  error: String = '';
  termine = false;
  leyendo = false;
  comentarios = new Array<Comentario>();
  comentario: Comentario = new Comentario;
  perfil: Profile;
  puedeComentar: boolean;
  comentarioStringify: string;
  miComentario: Comentario;
  porcentajePositivo;
  porcentajeNegativo;
  cantidadVotosPositivos;
  cantidadVotosNegativos;

  constructor(private ruta: ActivatedRoute, private router: Router, private bookService: BookService, private authService: AuthService) {
    this.ruta.params.subscribe(params => {
      this.bookService.getBook(params['id'])
        .subscribe(data => {
          this.book = data as Book;
          if ((this.book.active == false) || (new Date(this.book.duedate as string) < (new Date))) {
            this.error = "El libro no se encuentra activo en este momento";
          }
          this.capLeidos = this.bookService.getCapLeidos(this.book);
          this.fav = this.bookService.getFav(this.book._id);
          this.termine = this.bookService.termineLibro(this.book._id);
          this.leyendo = this.capLeidos != -2;
          this.comentarios = new Array<Comentario>();
          this.book.comments.forEach(element => {
            let aux = JSON.parse(element as string) as Comentario;
            if (aux.perfil != this.perfil._id) {
              this.comentarios.push(aux);
            } else {
              this.comentario.texto = aux.texto;
              this.comentario.like = aux.like;
              this.comentario.perfil = aux.perfil;
              this.comentario.nomPerfil = aux.nomPerfil;
              this.comentario.active = aux.active;
              this.miComentario = aux;
            }
          })
          this.puedeComentar = this.puedeCalificar();
          this.cantidadVotosPositivos = this.votosPositivos();
          this.cantidadVotosNegativos = this.votosNegativos();
          this.porcentajePositivo = Math.floor(this.porcentajeVotosPositivos());
          this.porcentajeNegativo = 100 - this.porcentajePositivo;
        });
    })
    this.perfil = authService.getProfile();

  }

  ngOnInit(): void {
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
  verCapitulo(cap) {
    var libro = {
      bookId: this.book._id,
      capAct: cap + 1
    }
    if (this.termine) {
      this.sacarDelHistorial();
    }
    this.capLeidos = this.bookService.setCapLeidoSacarLeido(libro);
    if (this.capLeidos != -1) {
      this.leyendo = true;
    } else {
      this.leyendo = false;
    }

  }



  leido(i) {
    return (this.termine) || (this.capLeidos >= i + 1)
  }
  agregarFav() {
    this.fav = this.bookService.setFav(this.book._id);
  }
  terminar() {
    this.termine = this.bookService.setHistory(this.book._id);
    this.leyendo = false;
  }
  sacarDelHistorial() {
    this.termine = this.bookService.removeHistory(this.book._id);
    this.capLeidos = -1;
  }
  sacarDeLeidos() {
    this.bookService.removeReading(this.book._id);
    this.capLeidos = -1;
    this.leyendo = false;
  }
  leidoCompleto() {
    return (this.termine) || (this.capLeidos == 0)
  }
  existeMiComentario() {
    return this.miComentario ? true : false;
  }

  puedeCalificar() {
    if (this.termine && !this.existeMiComentario()) {
      return true
    }
    return false;
  }

  like() {
    this.comentario.like = true;
  }

  dislike() {
    this.comentario.like = false;
  }

  calificar() {
    if (this.comentario.like != null) {
      this.comentario.perfil = this.perfil._id;
      this.comentario.nomPerfil = this.perfil.name;
      this.comentario.active = true;
      this.error = '';
      this.comentarioStringify = JSON.stringify(this.comentario);
      if (this.existeMiComentario()) {
        let aux = JSON.stringify(this.miComentario)
        let aux2 = this.book.comments.indexOf(aux);
        this.book.comments.splice(aux2, 1);
        this.book.comments.push(this.comentarioStringify);
        this.bookService.putBook(this.book).subscribe(params => {
          this.miComentario.texto = this.comentario.texto;
          this.miComentario.like = this.comentario.like;
          this.miComentario.nomPerfil = this.comentario.nomPerfil;
          this.miComentario.active = this.comentario.active;
          this.miComentario.perfil = this.comentario.perfil;
          this.cantidadVotosPositivos = this.votosPositivos();
          this.cantidadVotosNegativos = this.votosNegativos();
          this.porcentajePositivo = Math.floor(this.porcentajeVotosPositivos());
          this.porcentajeNegativo = 100 - this.porcentajePositivo;
        });
      } else {
        this.book.comments.push(this.comentarioStringify);
        this.bookService.putBook(this.book).subscribe(params => {
          this.comentarios = new Array<Comentario>();
          this.book.comments.forEach(element => {
            let aux = JSON.parse(element as string) as Comentario;
            if (aux.perfil != this.perfil._id) {
              this.comentarios.push(aux);
            }
          })
          this.miComentario = new Comentario();
          this.miComentario.texto = this.comentario.texto;
          this.miComentario.like = this.comentario.like;
          this.miComentario.nomPerfil = this.comentario.nomPerfil;
          this.miComentario.active = this.comentario.active;
          this.miComentario.perfil = this.comentario.perfil;
          this.puedeComentar = this.puedeCalificar();
          this.cantidadVotosPositivos = this.votosPositivos();
          this.cantidadVotosNegativos = this.votosNegativos();
          this.porcentajePositivo = Math.floor(this.porcentajeVotosPositivos());
          this.porcentajeNegativo = 100 - this.porcentajePositivo;
        })
      }
    } else {
      this.error = 'Se debe calificar con like o dislike obligatoriamente';
    }
  }

  refresh() {
    this.puedeComentar = this.puedeCalificar();
    this.comentario.texto = this.miComentario.texto;
    this.comentario.like = this.miComentario.like;
  }

  comentarioTieneTexto(texto: String) {
    if (texto && texto != '') {
      return true;
    }
    return false;
  }

  borrarComentario() {
    let aux = JSON.stringify(this.miComentario)
    let aux2 = this.book.comments.indexOf(aux);
    this.book.comments.splice(aux2, 1);
    this.bookService.putBook(this.book).subscribe(params => {
      this.miComentario = null;
      this.puedeComentar = this.puedeCalificar();
      this.comentario.texto = '';
      this.comentario.like = null;
      this.cantidadVotosPositivos = this.votosPositivos();
      this.cantidadVotosNegativos = this.votosNegativos();
      this.porcentajePositivo = Math.floor(this.porcentajeVotosPositivos());
      this.porcentajeNegativo = 100 - this.porcentajePositivo;
    })
  }

  votosPositivos() {
    let aux = 0;
    if (this.miComentario && this.miComentario.like) {
      aux += 1;
    }
    this.comentarios.forEach(element => {
      if (element.like) {
        aux += 1;
      }
    })
    return aux;
  }

  votosNegativos() {
    let aux = 0;
    if (this.miComentario && !this.miComentario.like) {
      aux += 1;
    }
    this.comentarios.forEach(element => {
      if (!element.like) {
        aux += 1;
      }
    })
    return aux;
  }

  porcentajeVotosPositivos() {
    let aux = this.votosPositivos();
    let total = aux + this.votosNegativos();
    if (total == 0) {
      return 50;
    }
    return (aux * 100) / total;
  }

}
