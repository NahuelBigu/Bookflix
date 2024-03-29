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
  error: String='';
  user:{
    email : String,
    password : String,
  } = {
      email: "",
      password: ""
  }
  constructor(private _servicio:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this._servicio.signIn(this.user)
      .subscribe(
        res => {
          this.correctLogin(res);
        },
        err=> this.error= err.error
      )
  }

  private correctLogin(data){
    this._servicio.setCurrentSession(data);
    this.router.navigate(['/select-profile']);
  }

}
