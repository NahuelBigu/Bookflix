import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { InicioGeneralComponent } from './components/home/inicio-general/inicio-general.component';
import { InicioComponent } from './components/home/inicio/inicio.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InicioGeneralComponent
  },
  {
    path: 'home',
    component: InicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
