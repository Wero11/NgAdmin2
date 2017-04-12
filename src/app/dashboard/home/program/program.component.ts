import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/first';

import { 
  SharedService , 
  ProgramModel,
  AssessmentModel,
  LevelModel,
  WorkoutModel,
  MessageService, 
  MessageType} from '../../../shared/shared.service';


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  form        : FormGroup;
  currentProgram : ProgramModel;      //current program
  
  /**
   * for levels...
   */  
  currentLevel   : LevelModel;        //current level
  levelList      : any;               //list of level
  workoutList    : WorkoutModel;      //list of workout

  /**
   * for level requirements...
   */
  assessmentList : any;


  constructor(
    private router        : Router,
    private route         : ActivatedRoute,
    private sharedService : SharedService
  ) {
    this.currentProgram = new ProgramModel();
    this.currentLevel   = null;
    this.form = new FormGroup({
      name         : new FormControl('', Validators.required),
      description  : new FormControl('', Validators.required),
      file1        : new FormControl(null),
      file2        : new FormControl(null),
      file3        : new FormControl(null),
      file4        : new FormControl(null),
      levelText1   : new FormControl(null),
      levelText2   : new FormControl(null),
      levelText3   : new FormControl(null),
      levelText4   : new FormControl(null),
    });
  }

  ngOnInit() {
    this.route
      .params
      .subscribe((params) => {
        if (params && params['id'])
          this.sharedService.getProgram(params['id'])
            .then((program: ProgramModel) => {
              this.currentProgram = program; 

              this.levelList = this.getLevels();
              this.levelList.subscribe((levels)=> {
                if (levels && levels[0]) {
                  this.currentLevel = new LevelModel();
                  this.currentLevel.id = levels[0].id;
                  this.onLevelSelected(this.currentLevel);
                }
              }, (error)=> console.log(error));

              this.assessmentList = this.sharedService.getAssessments(this.currentProgram.id);

            }, (error)=> {
              MessageService.showMessage(error.message || 'Unknown error', MessageType.DANGER);
            });
    }, (error)=> {
      MessageService.showMessage(error.message || 'Unknown error', MessageType.DANGER);
    });
  }

  onFile1Changed(event: any) {
      this.form.controls['file1'].setValue(event.target.files && event.target.files[0]);
  }
  onFile2Changed(event: any) {
      this.form.controls['file2'].setValue(event.target.files && event.target.files[0]);
  }
  onFile3Changed(event: any) {
      this.form.controls['file3'].setValue(event.target.files && event.target.files[0]);
  }
  onFile4Changed(event: any) {
      this.form.controls['file4'].setValue(event.target.files && event.target.files[0]);
  }
  /**
   * create a new level
   */
  addLevel() {
    this.getLevels()
      .first()
      .subscribe(res => {
      let level = new LevelModel();
      level.id = (res && res.length || 0) + 1;
      this.sharedService.addLevel(this.currentProgram.id, level);
    });
  }

  /**
   * on level selected....
   */
  onLevelSelected(level: LevelModel) {
    this.currentLevel = level;
    this.workoutList = this.sharedService.getWorkouts(this.currentProgram.id, this.currentLevel);
  }

  /**
   * remove selected workout day...
   */
  onRemoveWorkoutDay(day: any): void {
    this.sharedService.removeWorkout(day);
  }

  /**
   * copy selected workout day...
   */
  onCopyWorkoutDay(day: any): void {
    alert('will come soon...');
  }

  /**
   * get levels by program
   */
  private getLevels() {
    return this.sharedService.getLevels(this.currentProgram.id);
  }

  onAddDay() {
    let workout = new WorkoutModel();
    workout.title = "WorkOutDayModel";
    workout.programId = this.currentProgram.id;
    workout.levelId  = this.currentLevel.id;
    workout.week = 1;
    workout.day  = 2;
    this.sharedService.addWorkout(workout);
  }

  onReorderDays() {
    alert('coming soon...');
  }
}
