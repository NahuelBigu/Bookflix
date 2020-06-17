import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FindService } from '../../../services/all/find.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  busqueda: String
  data: any;
  totalRecords: number;
  page: number=1;
  constructor(private ruta: ActivatedRoute, private servicio: FindService) { 
    this.ruta.params.subscribe(params => {
      this.busqueda= params['txt'];
    });
    this.servicio.search(this.busqueda).subscribe(data  => { this.data=data['books']; this.totalRecords=this.data.length;   });
  }

  ngOnInit(): void {
    
  }
  
}
