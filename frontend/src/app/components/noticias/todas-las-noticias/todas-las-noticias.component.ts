import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../../services/noticias/noticias.service';
import { Noticia } from '../../../models/noticia';

@Component({
  selector: 'app-todas-las-noticias',
  templateUrl: './todas-las-noticias.component.html',
  styleUrls: ['./todas-las-noticias.component.css']
})
export class TodasLasNoticiasComponent implements OnInit {
  noticias: Array<Noticia>;
  constructor(private _servicioNoticias: NoticiasService) {}

  ngOnInit(): void {
     this.getNoticias();
  }
  getNoticias() {
    this._servicioNoticias.getNoticias().subscribe(res => {
      this.noticias= res as Array<Noticia>;
  });
  }

  
}
