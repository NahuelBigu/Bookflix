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
  oldPasswordTry: String= "";
  newPassword: String= "";
  newPasswordRepeated: String= ""; 
  success: boolean=false;

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
    const user = {
      user: this.user,
      oldPasswordTry: this.oldPasswordTry,
      newPassword: this.newPassword,
      newPasswordRepeated: this.newPasswordRepeated
    }
    this._authService.putUser(user).subscribe(data=>{
      this.success=true;
    },err => this.error=err.error);
  }
  
}
