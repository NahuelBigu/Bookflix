import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book';
import { BookService } from '../../../services/books/book.service';
import { BookSampleComponent } from '../../books/book-sample/book-sample.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService) { 
    this.bookService.getBooks()
      .subscribe(res => {
        this.books= res as Book[];
      });
  }

  ngOnInit(): void {
  }

}
