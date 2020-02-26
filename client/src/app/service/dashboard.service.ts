import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( private http:HttpClient ) { }

  public url='http://127.0.0.1:8000'

  getTrending()
  {
    return this.http.get(this.url+'/room/tags')
  }
}
