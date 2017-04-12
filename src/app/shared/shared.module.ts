import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FilePickerComponent } from './file-picker/file-picker.component';

import { SharedService, EventService, MessageService } from './shared.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent, 
    FooterComponent,
    SidebarComponent,
    SpinnerComponent,
    FilePickerComponent
  ],
  exports: [
    NavbarComponent, 
    FooterComponent,
    SidebarComponent,
    SpinnerComponent,
    FilePickerComponent
  ],
  providers: [
    SharedService,
    EventService,
    MessageService
  ]
})
export class SharedModule { }
