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
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/login/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    InicioGeneralComponent,
    InicioComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
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
