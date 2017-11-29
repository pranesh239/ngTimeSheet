import { AppUser } from './../module/appUser';
import { AuthService } from './../auth.service';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  userDetails:AppUser;
  checkInTime:string;
  checkOutCalc:string;
  durationHours;
  constructor(private auth:AuthService) {
   this.auth.userData$.subscribe(data => {
     this.userDetails = data;
   });

    if(localStorage.today)
      {
        this.checkInTime = moment(localStorage.today).format('LLLL');
        this.checkOutCalc = moment(localStorage.todayCalc).format('LLLL');
      }
   }


  //  LOGGING
   log()
   {
      let now = moment();
      
      if(!localStorage.today)
      {
        localStorage.today = now;
        localStorage.todayCalc = now.add(9,'hours');
        this.checkInTime = moment(localStorage.today).format('LLLL');
        this.checkOutCalc = moment(localStorage.todayCalc).format('LLLL');
        this.ngOnInit();
      }
    }


  //  REMAINING TIME CALC
   remainingTime()
   {
     let now  = moment();
     this.durationHours = moment.utc(moment(localStorage.todayCalc).diff(now)).format('hh:mm:ss');
   }


  //  RUNNER TIME
   ngOnInit() {
     if(localStorage.today)
     {
       setInterval(() =>{
         this.remainingTime();
       },1000);
     }
   }

}
