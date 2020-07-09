import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/login/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { PlanesService } from '../../../services/plan/planes.service';
import { Plan } from 'src/app/models/Plan';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: User;
  userNew: User;
  error: String='';
  oldPasswordTry: String= "";
  newPassword: String= "";
  newPasswordRepeated: String= ""; 
  success: boolean=false;
  planes: Plan[];
  
  
  constructor(private _authService:AuthService,
    private router: Router, private planService: PlanesService , private userService:UserService) {
    this.user=_authService.getCurrentUser();     
    planService.getPlanes().subscribe(p =>{ this.planes = p as Plan[]; console.log(this.planes);} );
    
  }
  
  ngOnInit(): void {
  }

  validUser(){
    return false;
  }

  editUser() {
    const user = {
      user: this.user,
      oldPasswordTry: this.oldPasswordTry,
      newPassword: this.newPassword,
      newPasswordRepeated: this.newPasswordRepeated
    }
    this._authService.putUser(user).subscribe(data=>{
      this.success=true;
    },err => this.error=err.error);
  }
  

  ascender(){
    this.userService.ascender(this.user._id).subscribe( a => {this.user=this._authService.actualizarUser();});
    
  }
  descender(){
    this.userService.descender(this.user._id).subscribe(a => {this.user=this._authService.actualizarUser();});
    
  }
}
