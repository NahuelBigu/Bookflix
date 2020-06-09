import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/books/book.service'
import { NgForm } from '@angular/forms';
import { Book } from '../../../models/book';
import { Router, ActivatedRoute } from "@angular/router";
import { Autor } from 'src/app/models/autor';
import { Editorial } from 'src/app/models/editorial';
import { Genero } from 'src/app/models/genero';
import { AutorService } from 'src/app/services/autor/autor.service';
import { GeneroService } from 'src/app/services/genero/genero.service';
import { EditorialService } from 'src/app/services/editorial/editorial.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  error:String="";
  book: Book= new Book;
  autor: Autor = new Autor;
  editorial: Editorial = new Editorial;
  genero: Genero = new Genero;
  autors;
  editoriales;
  generos;
  autorAdd: boolean = false;
  generoAdd: boolean = false;
  editorialAdd: boolean = false;
  
  constructor(private autorService: AutorService,private generoService: GeneroService,
     private editorialService: EditorialService,private ruta: ActivatedRoute,
      private router: Router, private bookService: BookService) {
    this.ruta.params.subscribe(params => {
      this.bookService.getBook(params['id'])
        .subscribe(data => {
          this.book= data as Book; 
        },err => this.error=err.error);
    })
   }

  ngOnInit(): void {
    this.autorService.getAutors().subscribe(data=> this.autors=data as Array<Autor>);
    this.generoService.getGeneros().subscribe(data=> this.generos=data as Array<Genero>);
    this.editorialService.getEditoriales().subscribe(data=> this.editoriales=data as Array<Editorial>);
    this.book.author="Autor";
    this.book.genre="Genero";
    this.book.editorial="Editorial";
  }

  validate(){
    if (this.book.author=="Autor") return 'Autor requerido';
    if (this.book.genre=="Genero") return 'Genero requerido';
    if (this.book.editorial=="Editorial") return 'Editorial requerida';
    return '';
  }

  editBook(){
    this.error=this.validate();
    if (this.error==''){
    this.bookService.putBook(this.book)
      .subscribe(res => {
        this.router.navigate(["/books/book/"+this.book._id]);
      },err => this.error=err.error);
    }
  }
  addAutor(){
    if (this.autor.name!=''){
      this.autorService.postAutor(this.autor)
      .subscribe(data => {
        this.autorService.getAutors().subscribe(data=> this.autors=data as Array<Autor>);
        this.book.author=this.autor.name;
      },err => this.error=err.error);
     
    }
  }
  addGenero(){
    if (this.genero.name!=''){
      this.generoService.postGenero(this.genero)
      .subscribe(data => {
        this.generoService.getGeneros().subscribe(data=> this.generos=data as Array<Genero>);
        this.book.genre=this.genero.name;
      },err => this.error=err.error);
     
    }
    
  }
  addEditorial(){
    if (this.editorial.name!=''){
      this.editorialService.postEditorial(this.editorial)
      .subscribe(data => {
        this.editorialService.getEditoriales().subscribe(data=> this.editoriales=data as Array<Editorial>);
        this.book.editorial=this.editorial.name;
      },err => this.error=err.error);
      
    }
    
  }

  
}
