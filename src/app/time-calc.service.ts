import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TimeCalcService {

  constructor(private db:AngularFireDatabase) { }

  updateCheckIn(checkInMoment, day)
  {
    let currentUser = localStorage.currentUser;
    this.db.object('users/'+currentUser+"/week/"+day).update({
          in:checkInMoment,
          out:''
      });
  }


  updateCheckOut(checkOutMoment, day)
  {
    let currentUser = localStorage.currentUser;
    this.db.object('users/'+currentUser+'/week/'+day).update({
        in:localStorage.today,
        out:checkOutMoment
      });
  }

  getTodaysData()
  {
    let currentUser = localStorage.currentUser;
    let day = localStorage.dayNo;
    let userLogData;
    this.db.object('users/'+currentUser+"/week/"+day).valueChanges().subscribe(data => {
      userLogData = data;
    });
    return userLogData;
  }

  getThisWeekData()
  {
    let currentUser = localStorage.currentUser;
    let day = localStorage.dayNo;
    let userLogData;
    return this.db.list('users/'+currentUser+"/week").snapshotChanges().map( changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
}