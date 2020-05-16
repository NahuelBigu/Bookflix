import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../../services/noticias/noticias.service';
import { Noticia } from '../../../models/noticia';
import { AuthService } from '../../../services/login/auth.service';
import { Router } from '@angular/router';
import { Creditcard } from '../../../models/creditcard';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.css']
})
export class CrearNoticiaComponent implements OnInit {
  error: String='';
  noticia:Noticia= new Noticia;
  constructor(private router:Router, private _servicio:NoticiasService, private _authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(JSON.parse(this._authService.getCurrentUser2()));
    this.noticia.author= JSON.parse(this._authService.getCurrentUser2()).creditCardName;
    this._servicio.postNoticia(this.noticia).subscribe(
      res => {
        this.router.navigate(['/noticia/'+res]);
      },
      err=> this.error= err.error
    )
  }
}
