import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router){}
  canActivate():boolean {
    if (this.authService.isAdmin()){
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
  
}
