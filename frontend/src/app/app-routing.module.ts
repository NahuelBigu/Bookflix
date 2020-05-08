import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { InicioGeneralComponent } from './components/home/inicio-general/inicio-general.component';
import { InicioComponent } from './components/home/inicio/inicio.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { TodasLasNoticiasComponent } from './components/noticias/todas-las-noticias/todas-las-noticias.component';
import { NoticiaComponent } from './components/noticias/noticia/noticia.component';
import { NoticiasAdministradorComponent } from './components/noticias/noticias-administrador/noticias-administrador.component';

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
    path: 'noticias/:id',
    component: NoticiaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'noticiasadministrador',
    component: NoticiasAdministradorComponent,
    canActivate: [AuthGuard,AdminGuard]
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
  {
    path: '**',
    redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
