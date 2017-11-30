import { AngularFireDatabase } from 'angularfire2/database';
import { TimeCalcService } from './../time-calc.service';
import { AppUser } from './../module/appUser';
import { AuthService } from './../auth.service';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/take';
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
  userLogData;
  showCheckIn:boolean=true;

  
  constructor(private auth:AuthService, private timeService:TimeCalcService, private db:AngularFireDatabase) {
        this.auth.userData$.subscribe(data => {
            this.userDetails = data;
        });

        console.log('constructor');

        
   }

  //  LOGGING
   log()
   {
      var now = moment();
      this.timeService.updateCheckIn(now.toString());
      this.showCheckIn=false;
      this.showLogs();
    }

  //  REMAINING TIME CALC
   remainingTime()
   {
     let now  = moment();
     this.durationHours = moment.utc(moment(localStorage.todayCalc).diff(now)).format('hh:mm:ss');
   }

   allocation()
   {
      this.checkInClacAllot(localStorage.today,localStorage.todayCalc);
      this.showCheckIn=false;
      if(localStorage.today)
      {
        setInterval(() =>{
          this.remainingTime();
        },1000);
      }
   }

   checkInClacAllot(today,todayCalc)
   {
    this.checkInTime = moment('"'+today+'"').format('LLLL');
    this.checkOutCalc = moment('"'+todayCalc+'"').format('LLLL');
   }

   showLogs()
   {
        if(!localStorage.today)
        {
            let currentUser = localStorage.currentUser;
            this.db.object('users/'+currentUser+"/today/in").valueChanges().take(1).subscribe(data => 
              {
                    this.userLogData = data;
                    localStorage.today = moment('"'+this.userLogData+'"');
                    localStorage.todayCalc = moment('"'+this.userLogData+'"').add(9,'hours');
                    this.allocation();
              });
        }
        else
        {
          this.checkInClacAllot(localStorage.today,localStorage.todayCalc);
          if(localStorage.today)
          {
              setInterval(() =>{
                  this.remainingTime();
              },1000);
          }
        }
   }

  //  RUNNER TIME
   ngOnInit() {

   }
}
