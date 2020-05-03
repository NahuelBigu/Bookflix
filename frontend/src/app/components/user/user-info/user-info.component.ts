import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/login/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: User
  constructor(private _authService:AuthService) { 
    this.user = _authService.getCurrentUser();
  }

  ngOnInit(): void {
  }

}
