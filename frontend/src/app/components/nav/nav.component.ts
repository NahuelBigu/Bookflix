import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/login/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  autenticado:boolean;
  admin:boolean;
  constructor(public authService:AuthService ) { 

  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
