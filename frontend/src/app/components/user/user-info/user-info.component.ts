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
  userForm: FormGroup;
  user: User;
  error: String='';

  constructor(private _builder: FormBuilder, 
    private _authService:AuthService,
    private router: Router) { 
    this.user = _authService.getCurrentUser();
    this.userForm = this._builder.group({
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      password: [this.user.password, Validators.required],
      plan: [this.user.plan,Validators.required],
      creditCardName: [this.user.creditCardName,Validators.required],
      creditCardNumber: [this.user.creditCardNumber,Validators.required],
      creditCardMM: [this.user.creditCardMM,Validators.required],
      creditCardYY: [this.user.creditCardYY,Validators.required],
      creditCardCVV: [this.user.creditCardCVV,Validators.required],
      oldPasswordTry: [''],
      newPassword: [''],
      newPasswordRepeated: ['']
    });
  }
  
  ngOnInit(): void {
  }

  validUser(){
    return false;
  }

  editUser() {
    this.user.email=this.userForm.value.email;
  }
  
  private correctLogin(data){
    this._authService.setCurrentSession(data);
    this.router.navigate(['/home']);
  }

}
