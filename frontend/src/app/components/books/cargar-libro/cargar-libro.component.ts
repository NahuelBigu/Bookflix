import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/books/book.service'
import { AutorService } from '../../../services/autor/autor.service'
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Book } from '../../../models/book';
import { Autor } from '../../../models/autor';
import { Router } from "@angular/router";

@Component({
  selector: 'app-cargar-libro',
  templateUrl: './cargar-libro.component.html',
  styleUrls: ['./cargar-libro.component.css']
})
export class CargarLibroComponent implements OnInit {

  book: Book = new Book;
  autor: Autor = new Autor;
  autors;
  genero: String = '';
  editorial: String = '';

  constructor(private bookService: BookService, private router: Router, private autorService: AutorService) {

   }

  ngOnInit(): void {
    this.autorService.getAutors().subscribe(data=> this.autors=data as Array<Autor>);
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
      console.log("Sape");
      this.autorService.postAutor(this.autor)
      .subscribe();
      this.autorService.getAutors().subscribe(data=> this.autors=data as Array<Autor>);
    }
    
  }
}
