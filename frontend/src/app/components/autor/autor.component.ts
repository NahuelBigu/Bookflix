import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorService } from '../../services/autor/autor.service';
import { Autor } from '../../models/autor';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
  autor: Autor;
  constructor(private ruta: ActivatedRoute,private autorService: AutorService) {
    this.ruta.params.subscribe(params => {
      this.autorService.getAutor(params['id'])
        .subscribe(data => {
          this.autor= data as Autor;
          
        });
    })
   }

  ngOnInit(): void {
  }

}
