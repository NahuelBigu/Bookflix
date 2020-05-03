import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/login/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user:{
    email : String,
    password : String,
  } = {
      email: "",
      password: ""
  }
  constructor( private _user: UserService,
    private _servicio:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this._servicio.signIn(this.user)
      .subscribe(
        res => {
          this._user.user= res.user;
          this._user.token = res.token;
          localStorage.setItem('token',res.token);
          console.log(res);
          this.router.navigate(['/home']);
        },
        err=> console.log(err)
      )
  }
}
