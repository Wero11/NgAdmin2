import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

import { HomeComponent } from './home.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { ProgramComponent } from './program/program.component';

import { HomeRoutingModule } from './home.routing';
import { SharedModule } from '../../shared/shared.module';
import { AddDayComponent } from './add-day/add-day.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [ 
    HomeComponent,
    AddProgramComponent,
    ProgramComponent,
    AddDayComponent 
  ],
  exports: [
    HomeComponent,
    AddProgramComponent,
    ProgramComponent,
    AddDayComponent
  ]
})
export class HomeModule { }
