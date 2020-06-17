import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneroService } from '../../services/genero/genero.service';
import { Genero } from '../../models/genero';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {
  genero: Genero;
  constructor(private ruta: ActivatedRoute,private generoService: GeneroService) { 
    this.ruta.params.subscribe(params => {
      this.generoService.getGenero(params['id'])
        .subscribe(data => {
          this.genero= data as Genero;
          
        });
    })
  }

  ngOnInit(): void {
  }

}
