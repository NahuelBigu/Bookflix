import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/login/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../others/interfaces';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user:{
    email:string,
    password:string
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
          localStorage.setItem('token',res.token);
          console.log(res);
          this.router.navigate(['/home']);
        },
        err=> console.log(err)
      )
  }
}
