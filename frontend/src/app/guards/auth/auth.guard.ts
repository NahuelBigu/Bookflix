import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';

import { AuthService } from '../../services/login/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router){}

  canActivate(): boolean{
    if (this.authService.isAuthenticated()){
      if((this.router.url !='select-profile') && (this.authService.isSelectProfile())){
        return true;
      }else{
        this.router.navigate(['select-profile']);
        return false;
      }
    }
    
    this.router.navigate(['']);
    return false;
  } 
  
}
