import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SharedModule } from '../../shared/shared.module';
// import { A } from './auth.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    LoginComponent, 
    SignupComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthModule { }
