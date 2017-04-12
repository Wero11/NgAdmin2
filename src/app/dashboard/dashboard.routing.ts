import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './not-found/not-found.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '',       component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login',  component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**',     component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: [],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [
    RouterModule
  ],
})
export class DashboardRoutingModule { }
