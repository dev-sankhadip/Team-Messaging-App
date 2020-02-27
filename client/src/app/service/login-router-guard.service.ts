import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class LoginRouterGuardService implements CanActivate {

  constructor( private http:HttpClient, private router:Router ) { }


  public url='http://127.0.0.1:8000';
  public isLogin:boolean


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    let token=window.localStorage.getItem("token");
    if(token)
    {
      return new Promise((resolve, reject)=>
      {
        this.http.get(this.url+'/user/status',{headers:new HttpHeaders({ 'authorization':token })})
        .subscribe((res)=>
        {
          if(res['status']==200)
          {
            resolve();
          }
          else
          {
            reject();
          }
        },(err)=>
        {
          reject();
        })
      })
      .then(()=>
      {
        this.router.navigate(['user']);
        return false;
      })
      .catch(()=>
      {
        return true;
      })
    }
    else
    {
      return true;
    }
    return this.isLogin;
  }
}
