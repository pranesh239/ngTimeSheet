import { AdminAuthService } from './../admin-auth.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displayAuth: Observable<firebase.User>;
  isAdmin:Observable<boolean>;
  constructor(private auth:AuthService, public admin:AdminAuthService) { 
    this.displayAuth = this.auth.user$;
    this.isAdmin = this.admin.canActivate();

   }

  ngOnInit() {
  }

  logout()
  {
    this.auth.logout();
  }

}
