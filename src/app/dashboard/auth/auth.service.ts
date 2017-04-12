import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

import * as firebase from 'firebase'

export interface UserModel {
    email: string;
    password: string;
    fullname: string;
}

@Injectable()
export class AuthService {

  constructor(
    private af: AngularFire
  ) { }

  getAuth() {
    return this.af.auth;
  }

  signInWithEmail(user: UserModel): firebase.Promise<any> {
    return this.getAuth().login({
      email: user.email, 
      password: user.password
    }, {
      provider: AuthProviders.Password, method: AuthMethods.Password
    });
  }

  signUpWithEmail(user: UserModel) {
    return new Promise((resolve, reject) => {
      this.getAuth().createUser({
        email    : user.email,
        password : user.password
      }).then(authData => {
        this.af.database.object('users/' + authData.auth.uid)
          .set({
            email       : user.email,
            password    : user.password,
            displayName : user.fullname,
            createdAt   : firebase.database['ServerValue']['TIMESTAMP']
          }).then(_=> resolve())
            .catch(error => reject(error));
      }).catch(error => reject(error));
    })
  }

  logout() {
    return this.getAuth().logout();
  }
}
