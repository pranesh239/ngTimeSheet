import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class TimeCalcService {

  constructor(private db:AngularFireDatabase) { }

}
