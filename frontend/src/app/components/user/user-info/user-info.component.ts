import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/login/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: User;
  userNew: User;
  error: String='';
  oldPasswordTry: String;
  newPassword: String;
  newPasswordRepeated: String; 

  constructor(private _authService:AuthService,
    private router: Router) {
    this.user=_authService.getCurrentUser();     
  }
  
  ngOnInit(): void {
  }

  validUser(){
    return false;
  }

  editUser() {
    if (this.newPassword!=this.newPasswordRepeated) { this.error='Las contraseñas nuevas no coinciden' };

    this._authService.putUser(this.user);
    
  }
  
}
