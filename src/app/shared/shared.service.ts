import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

import { AuthService } from '../dashboard/auth/auth.service';

/**
 * user model
 */
export class UserModel {
    id              ?: string;
    name            ?: string;
    email           ?: string;
    createdOn       ?: any;
    settings        ?: Array<any>; //or Object
}

/**
 * user history model
 */
export class UserHistoryModel {
    id              ?: string;
    userId          ?: string;
    title           ?: string;
}

/**
 * user status model
 */
export class UserStatusModel {
    userId          ?: string;
    programId       ?: string;
    levelId         ?: string;
}

/**
 * user subscriptions model
 */
export class SubscriptionModel {
    id              ?: string;
    userId          ?: string;
    programId       ?: string;
    createdOn       ?: any;
}

/**
 * program model
 */
export class ProgramModel {
    id              ?: string;
    name            ?: string;
    description     ?: string;
    billingType     ?: string;
    billingPrice    ?: number;
    photo           ?: any;
    video           ?: any;
    createdOn       ?: any;
    daysPerWeek     ?: Array<string>;            //['Monday', 'Tuesday', ...'Sunday']
    assessments     ?: Array<AssessmentModel>;
    levels          ?: Array<LevelModel>;
}

/**
 * assessment model
 */
export class AssessmentModel {
    id              ?: string;
    programId       ?: string;
    exerciseId      ?: string;
    description     ?: string;
    order           ?: number;
    isMobility      ?: boolean;
    mobileData      ?: Array<MobilityDataModel>;  // if isMobility == true
    levels          ?: Array<LevelModel>;       // if false
}

/**
 * mobility data model
 */
export class MobilityDataModel {
    id              ?: string;
    text            ?: string;
    url             ?: string;       //image url
}

/**
 * level model
 */
export class LevelModel {
    id              ?: string;
    programId       ?: string;
    description     ?: string;
    max             ?: string;
    workouts        ?: Array<WorkoutModel>;
}

/**
 * workout model
 */
export class WorkoutModel {
    id              ?: string;
    programId       ?: string;
    levelId         ?: string;
    day             ?: number;
    week            ?: number;
    title           ?: string;
    order           ?: string;
    sequences       ?: Array<SequenceModel>;
}

/**
 * exercise model
 */
export class ExerciseModel {
    id              ?: string;
    title           ?: string;
    video           ?: string;
}

/**
 * sequence model
 */
export class SequenceModel {
    id              ?: string;
    programId       ?: string;
    levelId         ?: string;
    workoutId       ?: string;
    title           ?: string;
    description     ?: string;
    order           ?: number;
    time            ?: string;
    exercises       ?: Array<SequenceExerciseModel>;
}

/**
 * sequence exercise model
 */
export class SequenceExerciseModel {
    id              ?: string;
    exerciseId      ?: string;
    note            ?: string;
    reps            ?: number;
    rest            ?: string;
    sets            ?: number;
    variations      ?: Array<VariationExerciseModel>;
}

/**
 * variation model
 */
export class VariationExerciseModel {
    id              ?: string;
    deficientExerciseId  ?: string;
    exerciseId      ?: string;
    note            ?: string;
    reps            ?: number;
    rest            ?: string;
    sets            ?: number;
}


@Injectable()
export class SharedService {
  authenticated: boolean;
  billingPlanList: Array<string> = ['monthly', 'bundle'];

  constructor(
    private af          : AngularFire,
    private authService : AuthService
  ) {
    this.authenticated = false;

    this.authService.getAuth().map(state=>!!state)
      .subscribe((authenticated)=> {
        this.authenticated = authenticated;
    });
  }

  /**
   * get all programs...
   */
  get allPrograms(): FirebaseListObservable<any> {
      return (this.authenticated) ? this.af.database.list('programs') : new FirebaseListObservable(null);
  }

  /**
   * get program by id...
   */
  getProgram(id: string): Promise<ProgramModel> {
    if (!this.authenticated)
      Promise.reject({message: 'unauthenticated.'});

    return new Promise<ProgramModel>((resolve, reject) => {
      let program = new ProgramModel();
      this.af.database.object('programs/' + id)
        .first()
        .subscribe((item) => {
          program.id           = id;
          program.name         = item.name;
          program.description  = item.description;
          program.billingType  = item.billingType;
          program.billingPrice = item.billingPrice;

          resolve(program);
        }, (error)=>reject(error));
    });
  }

  /**
   * add program
   */
  addProgram(program: ProgramModel): Promise<any> {
    if (!this.authenticated)
      Promise.reject({message: 'unauthenticated.'});

    return new Promise((resolve, reject)=> {
      Promise.all([
        this.uploadFile(program.photo, 'images'),
        this.uploadFile(program.video, 'videos')
      ]).then((results: Array<any>) => {
        program.photo = results[0].downloadURL;
        program.video = results[1].downloadURL;
        program.createdOn = firebase.database['ServerValue']['TIMESTAMP'];
        
        let programList = this.af.database.list('programs');
        resolve(programList.push(program));
      }, (error) => {
        reject(error); 
      });
    });
  }

  /**
   * get assessments by program id
   */
  getAssessments(pId: string) {
    if (!this.authenticated)
      Promise.reject({message: 'unauthenticated.'});

    return this.af.database.list('assessments/' + pId + '/');
  }

  /**
   * get levels by program id
   */
  getLevels(pId: string) {
    if (!this.authenticated)
      Promise.reject({message: 'unauthenticated.'});

    return this.af.database.list('levels/' + pId + '/');
  }

  /**
   * create a new level with program Id
   */
  addLevel(pId: string, level: LevelModel) {
    if (!this.authenticated)
      Promise.reject({message: 'unauthenticated.'});

    return this.af.database.object('levels/' + pId + '/' + level.id).set(level);
  }

  /**
   * get workout days with program id and level
   */
  getWorkouts(pId: string, level: LevelModel) {
    if (!this.authenticated)
      Promise.reject({message: 'unauthenticated.'});

    return this.af.database.list('workouts/' + pId).map(days=> {
      return days.filter(day => day.levelIdx == level.id);
    });
  }

  /**
   * create a new workout day...
   */

  addWorkout(workout: WorkoutModel) {
    return this.af.database.list('workouts/' + workout.programId).push(workout);
  }

  /**
   * remove Workouts by id(maybe key).
   */
  removeWorkout(workout: any) {
    return this.af.database.list('Workouts/' + workout.programId).remove(workout.$key);
  }

  /**
   * get levels by program id
   
  getLevels(pId: string): Promise<any> {
    return new Promise<LevelModel>((resolve, reject) => {
      this.af.database.object('/programs/' + 'id' + '/levels')
        .subscribe(res => {
            if (res.$value != null) {
              resolve(this.af.database.list('/levels').map(items => {
                return items.filter(item => Object.keys(res.$value).indexOf(item.$key) != -1);
              }));
            } else {
              resolve(this.af.database.list('/levels'));
            }
            
        }, (error)=> reject(error));
    })
  }
  */

  /**
   * create new level
   
  addLevel(level: LevelModel, programId?: string, assessmentId?: string): Promise<any> {
    var obj = {};
    obj[level.id] = true;

    let promiseList = [];
    if (programId)
      this.af.database.list('/programs/' + programId + 'levels/').push(obj);
    if (assessmentId)
      this.af.database.list('/assessments/' + assessmentId + 'levels/').push(obj);

    return Promise.all(promiseList);
  }
  */

  /**
   * upload file to the firebase storage...
   */
  private uploadFile(file: File, type: string = 'images'): Promise<any> {
    if (!this.authenticated)
      Promise.reject({message: 'unauthenticated.'});

    if (type != 'images' && type !='videos') 
       return Promise.reject({ message: 'Unsupported file.' });

    return new Promise((resolve, reject)=> {
      firebase.storage()
        .ref()
        .child(((type == 'images') ? 'images' : 'videos') + '/' + file.name)
        .put(file)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }) 
  }
}

export interface EventModel {
  name    : string;
  params ?: Array<any>;
}

/**
 * EventService
 */
@Injectable()
export class EventService {
  event$: Subject<EventModel>;

  constructor(
  ) {
    this.event$ = new BehaviorSubject<EventModel>(null);
  }

  addEvent(name: string, params?: Array<any>): void {
    this.event$.next({
      name   : name,
      params : params
    });
  }
}


declare var $: any;

export enum MessageType {
  DEFAULT,
  INFORMATION,
  SUCCESS,
  WARNING,
  DANGER
}

/**
 * MessageService
 */
@Injectable()
export class MessageService {

  /**
   * show message such as success/error, etc..
   */
  static showMessage(message: string, type: MessageType = 0): void {
    $.notify({
      icon: "notifications",
      message: message

    },{
        type: ['','info','success','warning','danger'][type],
        timer: 2000,
        placement: {
          from: 'bottom',
          align: 'center'
        }
    });
  }
}

