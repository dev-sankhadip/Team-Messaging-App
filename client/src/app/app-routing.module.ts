import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { ChatComponent } from './chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterGuardService } from './service/router-guard.service';
import { LoginRouterGuardService } from './service/login-router-guard.service';


const routes: Routes = [
  { path:'', component:LoginComponent, canActivate:[LoginRouterGuardService] },
  { path:'login', component:LoginComponent, canActivate:[LoginRouterGuardService] },
  { path:'signup', component:SignupComponent },
  { path:'user', component:UserComponent,canActivate:[RouterGuardService] },
  { path:'room/:id', component:ChatComponent, canActivate:[RouterGuardService] },
  { path:'dashboard', component:DashboardComponent,canActivate:[RouterGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
