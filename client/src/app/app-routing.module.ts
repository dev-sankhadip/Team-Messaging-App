import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { ChatComponent } from './chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path:'', component:LoginComponent },
  { path:'login', component:LoginComponent },
  { path:'signup', component:SignupComponent },
  { path:'user', component:UserComponent },
  { path:'room/:id', component:ChatComponent },
  { path:'dashboard', component:DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
