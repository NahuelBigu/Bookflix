import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  autenticado:boolean;
  admin:boolean;
  constructor(public authService:AuthService,public router: Router ) { 

  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }
  eselhome(){
    return this.router.url != "/"
  }

  isAdmin(){
    return this.authService.isAdmin();
  }


}
