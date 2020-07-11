import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { PlanesService } from '../../../services/plan/planes.service';
import { Plan } from 'src/app/models/Plan';
declare var $:any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  users: User[];
  planes: any[];
  constructor(private _service:UserService, private planService:PlanesService) { 
    planService.getPlanes().subscribe(p =>{ this.planes = p as Plan[];} );
    this.buscarUsuarios();
    
  }
  
  buscarUsuarios() {
    this._service.getUsers().subscribe(data => {this.users=data as User[]; this.cargarTabla()});
  }
 
  hacerAdmin(user: User){
    this._service.hacerAdmin(user._id).subscribe();
    user.plan=0;
  }
  
  sacarAdmin(user: User){
    this._service.sacarAdmin(user._id).subscribe();
    user.plan=1;
  }
  deshabilitar(user: User){
    this._service.deleteUser(user._id).subscribe();
    user.active=false;
  }
  habilitar(user: User){
    this._service.habilitar(user._id).subscribe();
    user.active=true;
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
  ngOnInit(): void {
    
  }
  
  
}
