import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user= {
    email: '',
    password: ''

  }
  constructor(private servicio:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this.servicio.signIn(this.user)
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
