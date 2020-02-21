import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class RouterGuardService implements CanActivate {

  constructor( private http:HttpClient ) { }
  
  public url='http://127.0.0.1:8000'

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    this.checkUserLoginStatus();
    return true;
  }

  checkUserLoginStatus()
  {
    this.http.get(this.url+'/user/status')
    .subscribe((res)=>
    {
      console.log(res);
    },(err)=>
    {
      console.log(err);
    })
  }
}
