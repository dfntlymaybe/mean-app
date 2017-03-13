import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { DealsService } from './deals.service'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PublicDealsComponent } from './public-deals/public-deals.component';
import { ProfileComponent } from './profile/profile.component';


const appRoutes: Routes = [
{path: 'home', component: HomeComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'deals', component: PublicDealsComponent},
{path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
{path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PublicDealsComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [AuthService, DealsService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
