import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { InicioGeneralComponent } from './components/home/inicio-general/inicio-general.component';
import { InicioComponent } from './components/home/inicio/inicio.component';
import { AuthGuard } from './auth.guard';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { TodasLasNoticiasComponent } from './components/noticias/todas-las-noticias/todas-las-noticias.component';

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
    path: 'noticias',
    component: TodasLasNoticiasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myUserInfo',
    component: UserInfoComponent,
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
