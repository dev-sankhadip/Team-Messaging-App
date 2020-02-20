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

  ngOnInit(): void {
  }

  create()
  {
    console.log(this.roomForm.value);
    this.service.createRoom(this.roomForm.value)
    .subscribe((res)=>
    {
      console.log(res);
    },(err)=>
    {
      console.log(err);
    })
  }

}
