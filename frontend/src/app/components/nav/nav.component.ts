import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/login/auth.service';
import { Router } from '@angular/router';
import { FindService } from 'src/app/services/all/find.service';
import { isArray } from 'util';
declare var $: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  autenticado: boolean;
  admin: boolean;

  aux: number = 0;

  keyword = "name";
  data: any[] = [];
  allBook: any;
  allAutor: any;
  allEditorial: any;
  allGenero: any;
  find: String = "";



  constructor(public authService: AuthService, public router: Router, private findService: FindService) {
    this.data = [];
    this.findService.getAll().subscribe(res => {
      this.allBook = res['books'];
      this.allBook.forEach(element => element['type'] = 'Libro');
      this.allAutor = res['autor'];
      this.allAutor.forEach(element => element['type'] = 'Autor');
      this.allEditorial = res['editoriales'];
      this.allEditorial.forEach(element => element['type'] = 'Editorial');

      this.allGenero = res['genero'];
      this.allGenero.forEach(element => element['type'] = 'Genero');

    })
  }

  ngOnInit(): void {
    $(document).ready(function() {
      $('input.ng-untouched.ng-pristine.ng-valid').css("background-color", "rgba(40, 40, 40, 0.11)")
      $('input.ng-untouched.ng-pristine.ng-valid').css("color", "white")
  })
  }

  logout() {
    this.authService.logout();
  }
  eselhome() {
    return this.router.url != "/"
  }

  isAdmin() {
    return this.authService.isAdmin();
  }



  onChangeSearch(event) {
    if (event.length > 2) {
      if (this.data.length === 0) {
        this.data = [];
        this.data = this.data.concat(this.allAutor);
        this.data = this.data.concat(this.allBook);
        this.data = this.data.concat(this.allEditorial);
        this.data = this.data.concat(this.allGenero);
      }
    } else {
      this.data = [];
    }
  }

  clear() {
    this.data = [];
  }
  selectEvent(find) {
    console.log(find);
    if (this.allBook.includes(find)) {
      this.router.navigate(['books/book/', find['_id']]);
    } else if (this.allAutor.includes(find)) {
      this.router.navigate(['autor/', find['_id']]);
    } else if (this.allEditorial.includes(find)) {
      this.router.navigate(['editorial/',find['_id']]);
    } else if (this.allGenero.includes(find)) {
      this.router.navigate(['genero/', find['_id']]);
    }
  }
  isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }
  buscar() {
   
      if (!this.isBlank(this.find)) {
        this.router.navigate(['busqueda/', this.find]);
      }
    
  }

  
}
