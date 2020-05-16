import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/books/book.service'
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Book } from '../../../models/book';
import { Router } from "@angular/router";

@Component({
  selector: 'app-cargar-libro',
  templateUrl: './cargar-libro.component.html',
  styleUrls: ['./cargar-libro.component.css']
})
export class CargarLibroComponent implements OnInit {

  book: Book = new Book;

  constructor(private bookService: BookService, private router: Router) {

   }

  ngOnInit(): void {
  }

  addBook(){
    this.bookService.postBook(this.book)
      .subscribe(res => {
        console.log('Book saved');
        this.router.navigate(['/home']);
      })
  }
}
