import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { InicioGeneralComponent } from './components/home/inicio-general/inicio-general.component';
import { InicioComponent } from './components/home/inicio/inicio.component';
import { NavComponent } from './components/nav/nav.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { TokenInterceptorService } from './services/login/token-interceptor.service';
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
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BusquedaComponent } from './components/buscar/busqueda/busqueda.component';
import { AllBooksComponent } from './components/books/all-books/all-books.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TrailerComponent } from './components/books/trailer/trailer.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    InicioGeneralComponent,
    InicioComponent,
    NavComponent,
    UserInfoComponent,
    TodasLasNoticiasComponent,
    NoticiaComponent,
    NoticiasAdministradorComponent,
    CargarLibroComponent,
    CrearNoticiaComponent,
    EditarNoticiaComponent,
    EditBookComponent,
    BookSampleComponent,
    OpcionesAdministradorComponent,
    SelectperfilComponent,
    UserListComponent,
    BusquedaComponent,
    AllBooksComponent,
    TrailerComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    NgxPaginationModule
  ],
  providers: [
    AuthGuard,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
