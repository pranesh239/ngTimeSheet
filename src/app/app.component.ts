import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private user:UserService, private auth: AuthService)
  {
    this.auth.user$.subscribe(userData =>{
      if(userData)
      {
        this.user.save(userData);
      }
    })
  }
}
