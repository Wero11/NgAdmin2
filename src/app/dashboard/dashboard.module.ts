import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { PageNotFoundComponent } from './not-found/not-found.component';

import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthModule,
    HomeModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [ 
    DashboardComponent, 
    PageNotFoundComponent,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
