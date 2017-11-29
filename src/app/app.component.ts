import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private user:UserService, private auth: AuthService, private router:Router)
  {
    this.auth.user$.subscribe(userData =>{
      if(userData)
      {
        let location = localStorage.getItem('redirect');
        this.user.save(userData);
        this.router.navigateByUrl(location);
      }
    })
  }
}