import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http:HttpClient ) { }

  public url='http://127.0.0.1:8000'

  signup(value)
  {
    console.log(value);
    this.http.post(this.url+'/user/signup',value)
    .subscribe((res)=>
    {
      console.log(res);
    },(err)=>
    {
      console.log(err);
    })
  }

  login(value)
  {
    console.log(value);
    this.http.post(this.url+'/user/login',{value})
  }
}
