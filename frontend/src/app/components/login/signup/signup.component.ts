import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/login/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user= {
    email: '',
    password: ''

  }
  constructor(private servicio:AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }

  signUp(){
    this.servicio.signUp(this.user)
      .subscribe(
        res => {
          localStorage.setItem('token',res.token);
          console.log(res);
          this.router.navigate(['/home']);
        },
        err=> console.log(err)
      )
  }

}
