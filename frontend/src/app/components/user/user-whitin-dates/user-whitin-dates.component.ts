import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/login/auth.service';
import { Router } from '@angular/router';
import { PlanesService } from 'src/app/services/plan/planes.service';
import { UserService } from 'src/app/services/user.service';
declare var $:any;

@Component({
  selector: 'app-user-whitin-dates',
  templateUrl: './user-whitin-dates.component.html',
  styleUrls: ['./user-whitin-dates.component.css']
})
export class UserWhitinDatesComponent implements OnInit {
  baseDate: Date;
  limitDate: Date;
  error: string;
  users;
  constructor(private _servicio: AuthService,
    private router: Router,
    private planService: PlanesService,
    private _service:UserService) { 
      
    }

  ngOnInit(): void {
  }

  buscarUsuarios() {
    this._service.getUsers().subscribe(data => {this.users=data as User[]; this.cargarTabla()});
  }

  cargarTabla() {
    $(function() {
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

  search(){
    if (!this.baseDate || !this.limitDate) {return this.error= 'Se debe especificar las fechas para buscar usuarios'};
    if (new Date(this.baseDate)>(new Date) || new Date(this.limitDate)>(new Date)) {return this.error= 'Las fechas a especificar deben ser anteriores a la fecha del dia de hoy'}
    this.error=null;
    this.buscarUsuarios();
  }
  

}
