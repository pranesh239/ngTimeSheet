import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class SecurityGuard implements CanActivate {

  constructor(private auth:AuthService, private route:Router, ) { }

  canActivate(route,state:RouterStateSnapshot) :Observable<boolean>
  {
    return this.auth.user$.map(data=> {
       if(data) return true
      else {
        this.route.navigate(['/login'],{queryParams:{redirectURL:state.url}})
          .then((nav) => console.log(nav));
        return  false;
      }
    });
  }

}
