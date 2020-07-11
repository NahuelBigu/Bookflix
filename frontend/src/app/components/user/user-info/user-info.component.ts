import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Profile } from '../../../models/profile';
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
  info = true;
  user: User;
  userNew: User;
  error: String='';
  oldPasswordTry: String= "";
  newPassword: String= "";
  newPasswordRepeated: String= ""; 
  success: boolean=false;
  planes: Plan[];
  newProfile: string;
  putProfile: string;
  profileToEdit: Profile;
  loggedProfile: Profile;
  
  
  constructor(private _authService:AuthService,
    private router: Router, private planService: PlanesService , private userService:UserService) {
    this.user=_authService.getCurrentUser();     
    planService.getPlanes().subscribe(p =>{ this.planes = p as Plan[];} );
    this.loggedProfile=this._authService.getProfile();
    console.log(this.loggedProfile);
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

  borrar(profile){
    if (this.user.profiles.length>1) {
      const index = this.user.profiles.indexOf(profile);
      if (index > -1) {
        this.user.profiles.splice(index, 1);
        this.userService.putProfile(this.user).subscribe();
      }
    }
    else { console.log("Tenes solo un perfil");}
  }
  
  agregar(profile){
    let p;
    if (!profile) { return this.error="Debe especificar un nombre no vacio para crear un perfil"; }
    if (this.user.plan==0) { p = 1 } else { p = this.user.plan-1 };
    if (this.user.profiles.length==this.planes[p].cantProfile) {return this.error="Ya se cuenta con el maximo de perfiles que el plan provee"};
    this.userService.crearProfile(profile,this.user._id).subscribe();
    this.user=this._authService.actualizarUser();
    
  }


  modificar(profile){
    if (!profile) { return this.error="Debe especificar un nombre no vacio para modificar un perfil"; };
    const i=this.user.profiles.findIndex(element => element._id==this.profileToEdit._id);
    console.log(i);
    this.user.profiles[i].name=profile;
    this.userService.putProfile(this.user).subscribe();
    this.user=this._authService.actualizarUser();
  }

  setProfileToEdit(profile){
    this.profileToEdit=profile;
  }

  cambiarPerfil(profile){
    this._authService.setProfile(profile);
    this.loggedProfile=this._authService.getProfile();
  }

}
