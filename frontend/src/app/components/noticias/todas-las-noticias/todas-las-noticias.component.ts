import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../../services/noticias/noticias.service';
import { Noticia } from '../../../models/noticia';
import { AuthService } from '../../../services/login/auth.service';

@Component({
  selector: 'app-todas-las-noticias',
  templateUrl: './todas-las-noticias.component.html',
  styleUrls: ['./todas-las-noticias.component.css']
})
export class TodasLasNoticiasComponent implements OnInit {
  noticiasAux: Array<Noticia>=new Array;
  noticias: Array<Noticia>=new Array;
  admin:boolean;
  constructor(private _servicioNoticias: NoticiasService,public authServices:AuthService) {this.admin=authServices.isAdmin();}

  ngOnInit(): void {
     this.getNoticias();
  }
  getNoticias() {
    this._servicioNoticias.getNoticias().subscribe(res => {
      this.noticiasAux= res as Array<Noticia>;
      this.noticiasAux.forEach(element => {
          var aux=this.noticiasAux.pop();
          if(aux.active){
            this.noticias.push(aux);
          }
      });
  });
  }

  
}
