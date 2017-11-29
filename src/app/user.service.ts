import { AppUser } from './module/appUser';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(private db:AngularFireDatabase) { }

  save(user: firebase.User)
  {
    this.db.object("users/"+user.uid).update({
      name:user.displayName,
      email:user.email,
      photoURL:user.photoURL
    })
  }

  getData(uid): Observable<AppUser>
  {
   return  this.db.object('users/'+uid).valueChanges()
  }

}
