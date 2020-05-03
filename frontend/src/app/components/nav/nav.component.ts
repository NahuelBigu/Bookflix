import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/login/auth.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public authService:AuthService , public userService:UserService) { }

  ngOnInit(): void {
  }

}
