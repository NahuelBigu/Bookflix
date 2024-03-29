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
import { CargarLibroComponent } from './components/books/cargar-libro/cargar-libro.component';
import { CrearNoticiaComponent } from './components/noticias/crear-noticia/crear-noticia.component';
import { EditarNoticiaComponent } from './components/noticias/editar-noticia/editar-noticia.component';
import { EditBookComponent } from './components/books/edit-book/edit-book.component';
import { BookSampleComponent } from './components/books/book-sample/book-sample.component';
import { OpcionesAdministradorComponent } from './components/admin/opciones-administrador/opciones-administrador.component';
import { SelectperfilComponent } from './components/login/selectperfil/selectperfil/selectperfil.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AllBooksComponent } from './components/books/all-books/all-books.component';
import { BusquedaComponent } from './components/buscar/busqueda/busqueda.component';
import { TrailerComponent } from './components/books/trailer/trailer.component';
import { ListarTrailersComponent } from './components/books/listar-trailers/listar-trailers.component';
import { TrailerNewOrEditComponent } from './components/trailerNewOrEdit/trailer-new-or-edit/trailer-new-or-edit.component';
import { TrailerEditComponent } from './components/trailerEdit/trailer-edit/trailer-edit.component';
import { LeerComponent } from './components/books/leer/leer.component';
import { PlanesComponent } from './components/admin/planes/planes.component';
import { UserWhitinDatesComponent } from './components/user/user-whitin-dates/user-whitin-dates.component';

const routes: Routes = [
  {
    path: '',
    component: InicioGeneralComponent,

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
    path: 'trailers',
    component: ListarTrailersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'noticia/:id',
    component: NoticiaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'noticia/editar/:id',
    component: EditarNoticiaComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'crear-noticia',
    component: CrearNoticiaComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'noticiasadministrador',
    component: NoticiasAdministradorComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'administrador',
    component: OpcionesAdministradorComponent,
    canActivate: [AuthGuard, AdminGuard]
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
    path: 'books/add',
    component: CargarLibroComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'books/edit/:id',
    component: EditBookComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'books/book/:id',
    component: BookSampleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'books/leer/:id/:cap',
    component: LeerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users-whitin-dates',
    component: UserWhitinDatesComponent,
    canActivate: [AuthGuard,AdminGuard]
  },
  {
    path: 'books/trailer/:id',
    component: TrailerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'books/trailer/agregar/:id',
    component: TrailerNewOrEditComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'books/trailer/editar/:id/:i',
    component: TrailerEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'select-profile',
    component: SelectperfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'administrar-usuarios',
    component: UserListComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'administrar-libros',
    component: AllBooksComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'administrar-planes',
    component: PlanesComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'busqueda/:txt',
    component: BusquedaComponent,
    canActivate: [AuthGuard]
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
