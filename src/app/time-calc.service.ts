import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class TimeCalcService {

  constructor(private db:AngularFireDatabase) { }

  updateCheckIn(checkInMoment)
  {
    let currentUser = localStorage.currentUser;
    this.db.object('users/'+currentUser).update({
        today:{
          in:checkInMoment,
          out:''
        }
      });
  }


  updateCheckOut(checkOutMoment)
  {
    let currentUser = localStorage.currentUser;
    this.db.object('users/'+currentUser+'/today/').update({
        in:localStorage.today,
        out:checkOutMoment
      });
  }

  getTodaysData()
  {
    let currentUser = localStorage.currentUser;
    let userLogData;
    this.db.object('users/'+currentUser+"/today").valueChanges().subscribe(data => {
      userLogData = data;
      console.log(userLogData);
    });
    return userLogData;
  }1

}
