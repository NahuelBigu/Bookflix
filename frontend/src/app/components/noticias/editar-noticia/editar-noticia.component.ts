import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService } from 'src/app/services/noticias/noticias.service';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.component.html',
  styleUrls: ['./editar-noticia.component.css']
})
export class EditarNoticiaComponent implements OnInit {
  error: String='';
  noticia:Noticia= new Noticia;
  constructor(private routerActive: ActivatedRoute , private _servicio:NoticiasService,private router:Router) { }

  ngOnInit(): void {
    let id = this.routerActive.snapshot.paramMap.get('id');
    this._servicio.getNoticia(id).subscribe(res => {
      this.noticia = res as Noticia;
    });
  }

  editar(){
    this._servicio.putNoticia(this.noticia).subscribe(
      res => {
        this.router.navigate(['/noticia/'+res]);
      },
      err=> this.error= err.error
    )
  }

}
