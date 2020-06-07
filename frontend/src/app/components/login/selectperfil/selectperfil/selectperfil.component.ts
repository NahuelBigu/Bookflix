import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/login/auth.service';
import { Profile } from '../../../../models/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selectperfil',
  templateUrl: './selectperfil.component.html',
  styleUrls: ['./selectperfil.component.css']
})
export class SelectperfilComponent implements OnInit {
  profiles: Array<Profile>;
  constructor(private _service: AuthService,private router:Router) {
     this.profiles= _service.getProfiles();
     console.log(_service.getProfiles());
   }

  ngOnInit(): void {
  }
  seleccionar(pr:Profile){
    this.router.navigate(['/home']);
  }
}
