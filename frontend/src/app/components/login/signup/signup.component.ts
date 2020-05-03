import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/login/auth.service';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Session } from 'src/app/models/session';
import { User } from '../../../models/user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : User

  userForm: FormGroup;

  constructor(private _builder: FormBuilder,
    private _servicio: AuthService,
    private router: Router) {

    this.userForm = this._builder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      plan: [0,Validators.required],
      creditCardName: ['',Validators.required],
      creditCardNumber: ['',Validators.required],
      creditCardMM: [0,Validators.required],
      creditCardYY: [0,Validators.required],
      creditCardCVV: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  validUser(){
    return (this.userForm.value.plan==0 || this.userForm.value.creditCardMM==0 || this.userForm.value.creditCardYY==0 || !this.userForm.valid);
  }

  signUp() {
    if (!this.validUser()){
      console.log(this.userForm.value);
      this._servicio.signUp(this.userForm.value)
      .subscribe(
        res => {
          this.correctLogin(res);
        },
        err=> console.log(err)
      )
    }
  }
  
  private correctLogin(data: Session){
    this._servicio.setCurrentSession(data);
    this.router.navigate(['/home']);
  }

}
