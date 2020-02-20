import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { RoomService } from '../service/room.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor( private service:RoomService ) { }

  roomForm=new FormGroup({
    roomName:new FormControl('', Validators.required),
    roomTags:new FormControl('', Validators.required)
  })

  public rooms=[]

  ngOnInit(): void {
    this.service.getAllRooms()
    .subscribe((res)=>
    {
      console.log(res['rooms']);
      res['rooms'].map((room)=>
      {
        let roomDetails={
          id:room[0],
          name:room[1],
          tags:room[2]
        }
        this.rooms.push(roomDetails)        
      })
    },(err)=>
    {
      console.log(err);
    })
  }

  create()
  {
    this.service.createRoom(this.roomForm.value)
    .subscribe((res)=>
    {
      console.log(res);
      let roomDetails={
        id:res['roomid'],
        name:this.roomForm.value.roomName,
        tags:this.roomForm.value.roomTags.split(',')
      }
      this.rooms.push(roomDetails)
      console.log(this.rooms);
    },(err)=>
    {
      console.log(err);
    })
  }

}
