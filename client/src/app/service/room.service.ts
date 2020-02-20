import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor( private http:HttpClient ) { }

  public url="http://127.0.0.1:8000";

  createRoom(value)
  {
    return this.http.post(this.url+'/room/create',value);
  }
}
