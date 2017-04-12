import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedService, MessageService, MessageType } from '../../shared/shared.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  programList   : any;
  isPageHidden  : boolean = true;
  loading       : boolean;

  constructor(
    private router       : Router,
    private route        : ActivatedRoute,
    private sharedServie : SharedService,
  ) { 
    this.loading = false;

    this.router.events
      .subscribe((state) => {
        if (!state)
          return;
        this.isPageHidden = !(state.url == '/' || state.url == '/dashboard');
      });
  }

  ngOnInit() {
    this.loading = true;
    this.programList = this.sharedServie.allPrograms;
    this.programList.subscribe(_=> this.loading = false);
  }
}
