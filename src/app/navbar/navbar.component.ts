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

  displayAuth: Observable<firebase.User>
  constructor(private auth:AuthService) { 
    this.displayAuth = this.auth.user$;
   }

  ngOnInit() {
  }

  logout()
  {
    this.auth.logout();
  }

}
