import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/books/book.service'
import { NgForm } from '@angular/forms';
import { Book } from '../../../models/book';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  error:String="";
  book: Book= new Book;

  constructor(private ruta: ActivatedRoute, private router: Router, private bookService: BookService) {
    this.ruta.params.subscribe(params => {
      this.bookService.getBook(params['id'])
        .subscribe(data => {
          this.book= data as Book;
        },err => this.error=err.error);
    })
   }

  ngOnInit(): void {
  }

  editBook(){
    this.bookService.putBook(this.book)
      .subscribe(res => {
        console.log('Book Updated');
      });
  }
}
