import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
declare var $:any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  constructor(private _service:UserService) { 
    this._service.getUsers().subscribe(data => this.users=data as User[]);
  }

  ngOnInit(): void {
    $(document).ready(function() {
    $('#table-users').DataTable({
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
