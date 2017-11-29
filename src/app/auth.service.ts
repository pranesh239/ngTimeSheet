import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth, private user: UserService) {
    this.user$ = afAuth.authState;
   }

  login()
  {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  get userData$()
  {
    return this.user$.switchMap(data =>{
      if(data) return this.user.getData(data.uid)

      else return Observable.of(null);
   
    })
  }

}
