import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias/noticias.service';
import { Noticia } from 'src/app/models/noticia';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-noticias-administrador',
  templateUrl: './noticias-administrador.component.html',
  styleUrls: ['./noticias-administrador.component.css']
})
export class NoticiasAdministradorComponent implements OnInit {
  noticiasLength:number;
  noticias: Array<Noticia>;
  constructor(private _servicioNoticias: NoticiasService) {}

  ngOnInit(): void {
    this.getNoticias();
  }
  getNoticias() {
    this._servicioNoticias.getNoticias().subscribe(res => {
      this.noticias= res as Array<Noticia>;
      this.noticiasLength= this.noticias.length;
  });
  }
  eliminarNoticia(_id: String){
    this._servicioNoticias.deleteNoticia(_id);
    this.actualizar(_id,false);
  }

  activarNoticia(_id: String){
    this._servicioNoticias.activateNoticia(_id);
    this.actualizar(_id,true);
  }

  actualizar(_id,valor:boolean){
    var found = this.noticias.find(function(element){
      return element._id == _id;
    })
    found.active=valor;
  }
}
