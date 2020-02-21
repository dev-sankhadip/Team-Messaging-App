import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class RouterGuardService implements CanActivate {

  constructor( private http:HttpClient, private router:Router ) { }
  
  public url='http://127.0.0.1:8000'
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
        return true;
      })
      .catch(()=>
      {
        return false;
      })
    }
    else
    {
      this.router.navigate(['login']);
    }
    return this.isLogin;
  }

  // checkUserLoginStatus()
  // {
  //   let token=window.localStorage.getItem("token");
  //   if(token)
  //   {
  //     this.http.get(this.url+'/user/status',{headers:new HttpHeaders({ 'authorization':token })})
  //     .subscribe((res)=>
  //     {
  //       console.log(res);
  //       return res['status'];
  //     },(err)=>
  //     {
  //       console.log(err);
  //     })
  //   }
  //   else
  //   {
  //     this.router.navigate(['login']);
  //   }
  // }
}
