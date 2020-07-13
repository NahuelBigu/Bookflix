import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/login/auth.service';
import { Router } from '@angular/router';
import { PlanesService } from 'src/app/services/plan/planes.service';
import { UserService } from 'src/app/services/user.service';
import { Plan } from 'src/app/models/Plan';
declare var $: any;

@Component({
  selector: 'app-user-whitin-dates',
  templateUrl: './user-whitin-dates.component.html',
  styleUrls: ['./user-whitin-dates.component.css']
})
export class UserWhitinDatesComponent implements OnInit {
  baseDate: Date;
  limitDate: Date;
  error: string;
  bol = false;
  users;
  planes: any[];
  constructor(private _servicio: AuthService,
    private router: Router,
    private planService: PlanesService,
    private _service: UserService) {
      planService.getPlanes().subscribe(p =>{ this.planes = p as Plan[];} );
  }

  ngOnInit(): void {
  }

  buscarUsuarios() {
    this._service.getUserBetweenDates(this.baseDate, this.limitDate).subscribe(data => { this.users = data as User[]; if (this.bol == false) { this.bol = true; } else { $('#table-users').DataTable().clear().destroy(); } this.cargarTabla(); });
  }

  cargarTabla() {
    $(function () {
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

  hacerAdmin(user: User) {
    this._service.hacerAdmin(user._id).subscribe();
    user.plan = 0;
  }

  sacarAdmin(user: User) {
    this._service.sacarAdmin(user._id).subscribe();
    user.plan = 1;
  }
  deshabilitar(user: User) {
    this._service.deleteUser(user._id).subscribe();
    user.active = false;
  }
  habilitar(user: User) {
    this._service.habilitar(user._id).subscribe();
    user.active = true;
  }

  search() {
    if (!this.baseDate || !this.limitDate) { return this.error = 'Se debe especificar las fechas para buscar usuarios' };
    if (new Date(this.baseDate) > (new Date) || new Date(this.limitDate) > (new Date)) { return this.error = 'Las fechas a especificar deben ser anteriores a la fecha del dia de hoy' }
    if (new Date(this.baseDate) > new Date(this.limitDate)) { return this.error = 'La fecha base debe ser anterior a la fecha limite' }
    this.error = null;
    this.buscarUsuarios();
  }


}
