import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { ChatComponent } from './chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterGuardService } from './service/router-guard.service';


const routes: Routes = [
  { path:'', component:LoginComponent },
  { path:'login', component:LoginComponent },
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
