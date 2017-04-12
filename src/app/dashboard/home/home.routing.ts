import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AddProgramComponent } from './add-program/add-program.component';
import { AddDayComponent } from './add-day/add-day.component';
import { ProgramComponent } from './program/program.component';
import { HomeComponent } from './home.component';

import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    { 
        path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: 'add-program',   component: AddProgramComponent },
            { path: 'add-day/:program/:level',   component: AddDayComponent },
            { path: 'program/:id',   component: ProgramComponent }
        ]
    }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [
    RouterModule
  ],
})
export class HomeRoutingModule { }
