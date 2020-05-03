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
    email: { type: String, required: true},
    password: { type: String, required: true},
    plan: { type: String, required: true},
    name: { type: String, required: true},
    creditCardNumber: { type: Number, required: true},
    expiration: {type: Date, required: true},
    CVV: {type: Number, required: true},
    historial: Array
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
