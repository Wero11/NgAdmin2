/**
 * ================================
 * =    FIREBASE DATABASE STRUCTURE
 * ================================
 */

/**
 * ASSESSMENTS
 */
{
  "assessments" : {                         // node name - "assessments"
    "-Kbk4EwvWLSebx50PvRe" : {              // program id
      "-KbfHhPkrIWyX5DnZG8U" : {            // assessment id
        "description" : "Complete...",      // description of assessment
        "exerciseId" : "-KbfHhPkrIWyX58U",  // exercise id
        "isMobility" : true,                // is mobility or not
        "levels" : {
          "level1" : true,                  //  level id
          "level2" : true,                  //      "
          "level3" : true                   //      "
        },
        "mobilityData" : {                  // mobility data(if isMobility == true)
          "-RGxhs234DFFD" : {
            "text" : "text for the mobile levels...",
            "url" : "https://firebasestorage.googleapis.com/v9039-a8a10be31197"
          }
        },
        "name" : "Push-up",                 // name of assesment
        "order": 4                          // order
      }
    }
  },

/**
 * EXERCISES
 */
  "exercises" : {                           // node name - "exercises"
    "-XFpQ2k2PfccPjKxxYkutHtyKn0F3" : {     // exercise id
      "title" : "Muscle-up",                // title of exercise
      "video" : "https://www.someurl.com"   // video url, (based on external data)
    }
  },
  "levels" : {
    "program-1" : {
      "daysPerWeek" : {
        "workout-1" : true,
        "workout-2" : true
      }
    }
  },

/**
 * PROGRAMS
 */
  "programs" : {
    "-Kbk4EwvWLSebx50PvRe" : {              // node name - "programs"
      "assessments" : {                     // assessments under the programs
        "-KbfHhPkrIWyX5DnZG8U" : true,      // assessment id
        "-KbjyH9VMm8opHjidlb_" : true       //      "
      },
      "billingPrice" : 24,                  // billing price
      "billingType" : "monthly",            // billing plan (monthly or bundle)
      "createdOn" : 1485791625320,          // created date (firebase server time)
      "daysPerWeek" : {                     // workouts
        "-KbkFtNCz_ciLzjlMWDW" : true,      // id of workouts
        "-KbkFtmpWk0MBHwcoMXX" : true       //   "
      },
      "description" : "Increase...",        // description of program
      "levels" : {                          // levels under the program
        "-Kbk6bBmY9vcmTlJ2C3o" : true,      // level id
        "-MMk234bBmTTsafC3o" : true
      },
      "name" : "Gymnastics",
      "photo" : "https://firebasestora...", // downloadUrl of photo
      "video" : "https://firebasestor..."   // downloadUrl of video
    }
  },

  /**
   * SEQUENCES
   */
  "sequences" : {                           // node name - "sequences"
    "program-1" : {                         // program id
      "level-1" : {                         // level id
        "id-1" : {                          // sequence id
          "description" : "description o",  // description of sequence
          "exercises" : {                   // exercises under the sequence
            "sequence-exercise-1" : true,   // sequence exercise id
            "sequence-exercise-2" : true    //     "
          },
          "order" : 14,                     // order
          "time" : 142312311,               // time
          "title" : "Sequence- 1"           // title of sequence
        }
      }
    }
  },

  
  /**
   * SEQUENCE EXERCISES
   */
  "sequenceExercises" : {                   // node name - "sequenceExercises"
    "sequence-exercise-1": {                // id
      "exerciseId" :"exercise -1",          // exercise id
        "note" : "this is note...",         // note
        "reps" : 21,                        // reps
        "rest" : "rest",                    // rest
        "sets" : 11,                        // sets
        "variations" : {                    // variations of sequences
            "variation-exercise-1" : true,  // variation exercise id
            "variation-exercise-2" : true   //  "
        }
    }
  },

  /**
   * SUBSCRIPTIONS
   */
  "subscriptions" : {                        // node name - "subscriptions"   
    "VY5StD7xAnZnl8RL1swqsopv5K12" : {       // user id
      "createdOn" : 12331532,                // created time
      "programId" : "program-1"              // program id
    }
  },

  /**
   * USER HISTORY
   */
  "userHistory" : {                           // node name - "userHistory"
    "user-1" : {                              // user id
      "id-1" : {                              // history id
        "title" : "logged in"                 // title of history
      },
      "id-2" : {                              // user id
        "title" : "logged out"                // title of history
      }
    }
  },

  /**
   * USER STATUS
   */
  "userStatus" : {                             // node name - "userStatus"
    "VY5StD7xAnZnl8RL1swqsopv5K12" : {         // user id
      "levelId" : "level-1",                   // program id
      "programId" : "program-1"
    }
  },

  /**
   * USERS
   */
  "users" : {                                   // node name - "users"
    "VY5StD7xAnZnl8RL1swqsopv5K12" : {          // user id
      "createdOn" : 124452323,                  // created time
      "email" : "xxx@xxx.com",                  // email
      "name" : "XXXX XXXXX",                    // name
      "settings" : {                            // settings
        "theme" : "theme-1",
        "timezone" : "GMT +8"
      }
    }
  },

  /**
   * VARIATION EXERCISE
   */
  "variationExercises" : {                      // node name - "variationExercises"  
      "variations-1" : {                        //id
        "exerciseId" :  "exercise-1",           // exercise id
        "deficientExerciseId" : "def-id-1",      // deficient Exercise Id (?)
        "note" : "note",                         // note
        "reps" : 22,                             // reps
        "rest" : "rest",                         // rest
        "sets" : 22                              // sets                                       
    }
  },

  /**
   * WORKOUTS
   */
  "workouts" : {                                // node name - "workouts"
    "program-1" : {                             // program id
      "level-1" : {                             // level id
        "day" : 2,                              // day
        "order" : 2,                            // order
        "sequences" : {                         // sequences under the workouts
          "sequence-1" : true,                  // sequence id
          "sequence-2" : true                   //      "
        },
        "title" : "Week 1, Day 1",              // title of workout
        "week" : 1                              // week
      }
    }
  }
}


/**
 * ======================================
 * =       DATA MODEL
 * ======================================
 */

class UserModel {
    id              : string;
    name            : string;
    email           : string;
    createdOn       : any;
    settings        : Array<any>; //or Object
}

class UserHistoryModel {
    id              : string;
    userId          : string;
    title           : string;
}

class UserStatusModel {
    userId          : string;
    programId       : string;
    levelId         : string;
}

class SubscriptionModel {
    userId          : string;
    programId       : string;
    createdOn       : any;
}

class ProgramModel {
    id              : string;
    name            : string;
    description     : string;
    billingType     : string;
    billingPrice    : number;
    photo           : any;
    video           : any;
    createdOn       : any;
    daysPerWeek     : Array<string>;            //['Monday', 'Tuesday', ...'Sunday']
    assessments     : Array<AssessmentModel>;
    levels          : Array<LevelModel>;
}

class AssessmentModel {
    id              : string;
    programId       : string;
    exerciseId      : string;
    name            : string;
    description     : string;
    order           : number;
    isMobility      : boolean;
    mobileData      : Array<MobileDataModel>;
    levels          : Array<LevelModel>;
}

class MobileDataModel {
    id              : string;
    text            : string;
    url             : string;       //image url
}

class LevelModel {
    id              : string;
    programId       : string;
    description     : string;
    min             : string;
    max             : string;
    workouts        : Array<WorkoutModel>;
}

class WorkoutModel {
    id              : string;
    programId       : string;
    levelId         : string;
    day             : string;
    week            : string;
    title           : string;
    order           : string;
    sequences       : Array<SequenceModel>;
}

class ExerciseModel {
    id              : string;
    title           : string;
    video           : string;
}

class SequenceModel {
    id              : string;
    programId       : string;
    levelId         : string;
    workoutId       : string;
    title           : string;
    description     : string;
    order           : number;
    time            : string;
    exercises       : Array<SequenceExerciseModel>;
}

class SequenceExerciseModel {
    id              : string;
    exerciseId      : string;
    note            : string;
    reps            : number;
    rest            : string;
    sets            : number;
    variations      : Array<VariationExerciseModel>;
}

class VariationExerciseModel {
    id              : string;
    deficientExerciseId  : string;
    exerciseId      : string;
    note            : string;
    reps            : number;
    rest            : string;
    sets            : number;
}
/* SequenceExerciseModel and VariationExerciseModel can be merged in to one model */