import { Component, OnInit } from '@angular/core';

import { SharedService, EventService, EventModel } from '../shared.service';
import { AuthService } from '../../dashboard/auth/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    logo          : string  = 'assets/img/logo.png';
    authenticated : boolean;
    programList   : any;
    loading       : boolean;

    constructor(
      private authService   : AuthService,
      private eventService  : EventService,
      private sharedService : SharedService
    ) {
      this.authenticated = false;
      this.loading       = false;
    }

    ngOnInit(){
      this.authService.getAuth().subscribe((state) => {
        if (!!state) {
          this.authenticated = true;
          this.programList = this.sharedService.allPrograms;
          this.loading = true;

          if (this.programList)
            this.programList.subscribe(_=> this.loading = false);
        }
      }, (error)=> console.log(error));

      


      this.eventService.event$.subscribe((ev: EventModel) => {
        if (!ev)
          return;
        if (ev.name == 'updated:program') {
          this.programList = this.sharedService.allPrograms;
          this.loading = true;

          if (this.programList)
            this.programList.subscribe(_=> this.loading = false);
        }
      });
    }

    logout() {
      this.authenticated = false;
      this.authService.logout()
        .then(_=> {
          this.authenticated = false;
          this.eventService.addEvent('logout');
        });
    }

}
