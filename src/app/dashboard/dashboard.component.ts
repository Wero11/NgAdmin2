import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { EventService, EventModel } from '../shared/shared.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router       : Router,
    private route        : ActivatedRoute,
    private eventService : EventService
  ) {
    this.router.events.subscribe(state => {
      if (state instanceof NavigationStart) {
        let url = state.url;
        if (url!)
          return;
        
        if (url == '/' || url == '/dashboard')
          this.eventService.addEvent('dashboard:route');
      }
    });
  }

  ngOnInit() {
  }
}
