import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class AdminAuthService implements CanActivate {



  constructor(private auth:AuthService, private route:Router) { }

  canActivate(): Observable<boolean>{
    return this.auth.userData$.map(data => {
      if(data.isAdmin) {console.log('admin');return true}

      else {console.log('not a admin'); return false}
    }) 
  }

}
