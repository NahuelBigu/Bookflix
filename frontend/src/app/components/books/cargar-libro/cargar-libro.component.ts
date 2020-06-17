import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/books/book.service'
import { AutorService } from '../../../services/autor/autor.service'
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Book } from '../../../models/book';
import { Autor } from '../../../models/autor';
import { Router } from "@angular/router";
import { Genero } from 'src/app/models/genero';
import { GeneroService } from 'src/app/services/genero/genero.service';
import { Editorial } from 'src/app/models/editorial';
import { EditorialService } from 'src/app/services/editorial/editorial.service';

@Component({
  selector: 'app-cargar-libro',
  templateUrl: './cargar-libro.component.html',
  styleUrls: ['./cargar-libro.component.css']
})
export class CargarLibroComponent implements OnInit {
  error:String="";
  book: Book = new Book;
  autor: Autor = new Autor;
  editorial: Editorial = new Editorial;
  genero: Genero = new Genero;
  autors;
  editoriales;
  generos;
  autorAdd: boolean = false;
  generoAdd: boolean = false;
  editorialAdd: boolean = false;
  arrayOfIndex =new Array<Number>();

  constructor(private bookService: BookService, private router: Router, private autorService: AutorService,private generoService: GeneroService,private editorialService: EditorialService) {

   }

  ngOnInit(): void {
    this.autorService.getAutors().subscribe(data=> this.autors=data as Array<Autor>);
    this.generoService.getGeneros().subscribe(data=> this.generos=data as Array<Genero>);
    this.editorialService.getEditoriales().subscribe(data=> this.editoriales=data as Array<Editorial>);
    this.book.author="Autor";
    this.book.genre="Genero";
    this.book.editorial="Editorial";
    this.book.chapters=new Array<String>();
  }

  validate(){
    if (this.book.author=="Autor") return 'Autor requerido';
    if (this.book.genre=="Genero") return 'Genero requerido';
    if (this.book.editorial=="Editorial") return 'Editorial requerida';
    return '';
  }

  addBook(){
    this.error=this.validate();
    if (this.error==''){
    this.bookService.postBook(this.book)
      .subscribe(res => {
        console.log('Book saved');
        this.router.navigate(['/home']);
      },err => this.error=err.error)
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
  

  chapterChanged()
  {
    var aux= this.book.chapters;
   this.book.chapters= new Array(this.book.maxChapters);;
   for (let i=0;i<this.book.chapters.length && i<aux.length ;i++) {
     this.book.chapters[i]=aux[i];
   }

   this.arrayOfIndex= new Array();
   for (let i=0;i<this.book.maxChapters;i++) {
     this.arrayOfIndex[i]=i;
   }
 }
}
