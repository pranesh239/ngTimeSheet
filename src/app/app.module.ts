import { AdminAuthService } from './admin-auth.service';
import { SecurityGuard } from './security-guard.service';
import { TimeCalcService } from './time-calc.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';


import { AppComponent } from './app.component';
import { TodayComponent } from './today/today.component';
import { ThisWeekComponent } from './this-week/this-week.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';


const route:Routes =[
  {
    path: '', 
    redirectTo: '/today', 
    pathMatch: 'full' 
  },
  {
    path: 'login', 
    component:LoginComponent
  },
  {
    path:'today',
    component:TodayComponent,
    canActivate:[SecurityGuard]
  },
  {
    path:'thisweek',
    component:ThisWeekComponent,
    canActivate:[SecurityGuard, AdminAuthService]

  },
  {
    path:'admin',
    component:AdminComponent,
    canActivate:[SecurityGuard, AdminAuthService]
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
    ThisWeekComponent,
    NotFoundComponent,
    NavbarComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(route),
    
    NgbModule.forRoot(),

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    UserService,
    TimeCalcService,
    SecurityGuard,
    AdminAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
