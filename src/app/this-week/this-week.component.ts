import { TimeCalcService } from './../time-calc.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.css']
})
export class ThisWeekComponent implements OnInit {

  weekData;
  constructor(private timeService:TimeCalcService) {
      this.timeService.getThisWeekData().subscribe(data => this.weekData = data);
      // console.log(this.timeService.getThisWeekData());
   }

   ngOnInit() {
  }

   convertion(momentVal)
   {
      return moment('"'+momentVal+'"').format('LTS');
   }

   getDay(time)
   {
     return moment('"'+time+'"').format("dddd");
   }

   getEstimatedTime(momentData)
   {
     console.log(moment('"'+momentData+'"').add(9,'hours'));
     return moment('"'+momentData+'"').add(9,'hours');
   }

   differenceHours(inTime,outTime)
   {
     return moment.utc(moment(outTime).diff(moment(inTime))).format('HH:mm:ss');
   }


}
