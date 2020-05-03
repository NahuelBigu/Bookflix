import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/login/auth.service';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user= {
    email: '',
    password: '',
    plan: 0,
    name: '',
    creditCard: {
      creditCardNumber: '',
      expiration: new Date,
      CVV: ''
    },
    historial: new Array
  }
  constructor(private servicio:AuthService,
              private router:Router,
              private _user: UserService) { }

  ngOnInit(): void {
  }

  signUp(){
    this.servicio.signUp(this.user)
      .subscribe(
        res => {
          this._user.user= res.user;
          localStorage.setItem('token',res.token);
          console.log(res);
          this.router.navigate(['/home']);
        },
        err=> console.log(err)
      )
  }

}
