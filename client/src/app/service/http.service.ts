import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http:HttpClient ) { }

  public url='http://127.0.0.1:8000'

  signup(value)
  {
    return this.http.post(this.url+'/user/signup',
    value,{headers:new HttpHeaders({ 'Accept':'application/json','Content-Type':'application/json' })})
  }

  login(value)
  {
    return this.http.post(this.url+'/user/login',value)
  }
}
