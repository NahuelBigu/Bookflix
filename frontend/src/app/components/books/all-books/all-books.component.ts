import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/books/book.service';
declare var $:any;


@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {
  
  books: Book[];
  constructor(private _service:BookService) { 
    this._service.getBooks().subscribe(data => {this.books=data as Book[]; this.cargarTabla();});
  }

  

  deshabilitar(book: Book){
    this._service.deleteBook(book).subscribe();
    
  }
  habilitar(book: Book){
    this._service.habilitar(book).subscribe();
    
  }

  ngOnInit(): void {
    
  }

  cargarTabla() {
    $(function() {
      $('#table-books').DataTable({
        "bPaginate": "simple", // "simple" option for 'Previous' and 'Next' buttons only
  
        "bFilter": true,
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_",
            "infoEmpty": "Mostrando 0 a 0 de 0",
            "infoFiltered": "(Filtrado de _MAX_ total)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
  
  
    });
    $('.dataTables_length').addClass('bs-select');
  });
  }
}
