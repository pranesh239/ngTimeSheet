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
  showFlag:boolean=false;

  
  constructor(private auth:AuthService, private timeService:TimeCalcService, private db:AngularFireDatabase) {
        this.auth.userData$.subscribe(data => {
            this.userDetails = data;
        });

        console.log('constructor');

        localStorage.dayNo = moment().isoWeekday();
        
   }

  //  LOGGING
   log()
   {
      var now = moment();
      this.timeService.updateCheckIn(now.toString(),localStorage.dayNo);
      this.showFlag=true;
      this.showLogs();
    }

    // checkOut
    checkOut()
    {
      console.log('checkout');
       var now = moment();
       this.timeService.updateCheckOut(now.toString(), localStorage.dayNo);
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
      this.showFlag=true;
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
            this.db.object('users/'+currentUser+"/week/"+localStorage.dayNo+"/in/").valueChanges().take(1).subscribe(data => 
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
