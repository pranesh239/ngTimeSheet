import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthService implements CanActivate {



  constructor(private auth:AuthService) { }

  canActivate(): Observable<boolean>{
    // return this.auth.userData$().map()
  }

}
