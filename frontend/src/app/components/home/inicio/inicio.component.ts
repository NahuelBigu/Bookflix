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
  favs: any[] = [];
  constructor(private bookService: BookService) {
    this.bookService.getActiveBooks()
      .subscribe(res => {
        this.books = res as Book[];
        var collection = [];
        this.books.forEach((element, index) => {
          collection.push(element);
          if (index == 4) {
            this.favs.push(collection);
            collection = [];
          }

        });
        this.favs.push(collection);
        console.log(this.favs)
      });


  }

  ngOnInit(): void {
  }

}
