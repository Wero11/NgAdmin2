import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedService, ProgramModel, LevelModel, MessageService, MessageType} from '../../../shared/shared.service';


@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.component.html',
  styleUrls: ['./add-day.component.css']
})
export class AddDayComponent implements OnInit {
  currentProgram : ProgramModel;
  currentLevel   : LevelModel;
  
  constructor(
    private router        : Router,
    private route         : ActivatedRoute,
    private sharedService : SharedService
  ) {
    this.currentProgram = new ProgramModel();
    this.currentLevel   = new LevelModel();

    this.route
      .params
      .subscribe((params) => {
        let programId = params['program'];
        let level     = params['level'];
        if (programId && level) {
          this.currentLevel.id = level;
          this.sharedService.getProgram(programId)
            .then((program : ProgramModel) => {
              this.currentProgram  = program;
            })
            .catch((error) => MessageService.showMessage(error.message || 'Unknown error.', MessageType.WARNING));
        } else {
          this.router.navigate(['/dashboard/program/' + programId], [{relativeTo: this.route}]);
        }
      })
  }

  ngOnInit() {
  }

}
