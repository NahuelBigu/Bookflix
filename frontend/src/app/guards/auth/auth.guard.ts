import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from '../../services/login/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      if (route.url[0].path == 'select-profile') {
        return true;
      } else {
        if (!this.authService.isSelectProfile()) {
          this.router.navigate(['select-profile']);
          return false;
        } else {
          return true;
        }
      }

    }
    console.log(route.url);
    this.router.navigate(['']);
    return false;
  }

}
