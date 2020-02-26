import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor( private http:HttpClient ) { }

  public url="http://127.0.0.1:8000";

  createRoom(value):Observable<any>
  {
    return this.http.post(this.url+'/room/create',value);
  }

  getAllRooms()
  {
    return this.http.get(this.url+"/room")
  }

  getChats(roomid:String)
  {
    return this.http.post(this.url+'/room/chats',{roomid})
  }

  checkIfInRoom(roomid:String)
  {
    return this.http.post(this.url+'/room/checkroom',{roomid})
  }

  joinRoom(roomid:String)
  {
    return this.http.post(this.url+'/room/join',{roomid})
  }
}
