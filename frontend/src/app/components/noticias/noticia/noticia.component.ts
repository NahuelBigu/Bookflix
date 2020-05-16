import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiasService } from '../../../services/noticias/noticias.service';
import { Noticia } from 'src/app/models/noticia';
import { AuthService } from '../../../services/login/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  noticia: any;
  constructor(private router: ActivatedRoute , private service:NoticiasService) { 
    
  }

  ngOnInit(): void {
    let id = this.router.snapshot.paramMap.get('id');
    this.service.getNoticia(id).subscribe(res => {
      this.noticia = res as Noticia;
  
    });
  }

}
