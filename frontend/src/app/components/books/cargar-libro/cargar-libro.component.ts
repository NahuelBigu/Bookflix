import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/books/book.service'
import { AutorService } from '../../../services/autor/autor.service'
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Book } from '../../../models/book';
import { Autor } from '../../../models/autor';
import { Router } from "@angular/router";
import { Genero } from 'src/app/models/genero';
import { GeneroService } from 'src/app/services/genero/genero.service';

@Component({
  selector: 'app-cargar-libro',
  templateUrl: './cargar-libro.component.html',
  styleUrls: ['./cargar-libro.component.css']
})
export class CargarLibroComponent implements OnInit {

  book: Book = new Book;
  autor: Autor = new Autor;
  genero: Genero = new Genero;
  autors;
  generos;
  editorial: String = '';

  constructor(private bookService: BookService, private router: Router, private autorService: AutorService,private generoService: GeneroService) {

   }

  ngOnInit(): void {
    this.autorService.getAutors().subscribe(data=> this.autors=data as Array<Autor>);
    this.generoService.getGeneros().subscribe(data=> this.generos=data as Array<Genero>);
  }

  addBook(){
    this.bookService.postBook(this.book)
      .subscribe(res => {
        console.log('Book saved');
        this.router.navigate(['/home']);
      })
  }
  addAutor(){
    if (this.autor.name!=''){
      this.autorService.postAutor(this.autor)
      .subscribe();
      this.autorService.getAutors().subscribe(data=> this.autors=data as Array<Autor>);
    }
  }
  addGenero(){
    if (this.genero.name!=''){
      this.generoService.postGenero(this.genero)
      .subscribe();
      this.generoService.getGeneros().subscribe(data=> this.generos=data as Array<Genero>);
    }
  }
  
}
