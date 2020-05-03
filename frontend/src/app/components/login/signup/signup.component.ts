import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/login/auth.service';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    email: '',
    password: '',
    plan: 0,
    name: '',
    creditCard: {
      creditCardName: '',
      creditCardNumber: '',
      expiration: new Date,
      CVV: ''
    },
    historial: new Array
  }

  userForm: FormGroup;

  constructor(private _builder: FormBuilder,
    private servicio: AuthService,
    private router: Router,
    private _user: UserService) {

    this.userForm = this._builder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      plan: [1,Validators.required],
      creditCardName: ['',Validators.required],
      creditCardNumber: ['',Validators.required],
      creditCardMM: ['',Validators.required],
      creditCardYY: ['',Validators.required],
      creditCardCVV: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  signUp() {
    console.log(this.userForm.value);
    this.servicio.signUp(this.userForm.value)
      .subscribe(
        res => {
          this._user.user = res.user;
          localStorage.setItem('token', res.token);
          console.log(res);
          this.router.navigate(['/home']);
        },
        err => console.log(err)
      )
  }

}
