import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;
  redirectPath;
  constructor(private afAuth: AngularFireAuth, private user: UserService, private route:Router, private path: ActivatedRoute) {
    this.user$ = afAuth.authState;
    console.log(afAuth.authState);
   }

  login()
  {
      this.redirectPath=this.path.snapshot.queryParamMap.get('redirectURL') || '';
      localStorage.setItem('redirect',this.redirectPath);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout()
  {
    this.afAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('today');
        localStorage.removeItem('todayCalc');
        localStorage.removeItem('currentUser');
        this.route.navigate(['/login']);
    })
    
  }

  get userData$()
  {
    return this.user$.switchMap(data =>{
      if(data) return this.user.getData(data.uid)

      else return Observable.of(null);
    
    })
  }

}
