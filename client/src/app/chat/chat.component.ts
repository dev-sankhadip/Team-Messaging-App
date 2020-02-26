import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms'
import { RoomService } from '../service/room.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor( private route:ActivatedRoute, private service:RoomService ) { }

  public id:String
  public chatSocket
  public socketURL='127.0.0.1:8000'
  public isValid:boolean
  public chats

  chatForm=new FormGroup({
    message:new FormControl('')
  })


  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.setSocket();
    this.service.checkIfInRoom(this.id)
    .subscribe((res1)=>
    {
      this.isValid=true
      this.service.getChats(this.id)
      .subscribe((res2)=>
      {
        console.log(res2);
        this.chats=res2['chats'];
      },(err)=>
      {
        console.log(err);
      })
    },(err)=>
    {
      this.isValid=false
      console.log(err);
    })
  }

  setSocket()
  {
    this.chatSocket = new WebSocket('ws://' + this.socketURL + '/ws/chat/' + this.id + '/');
    this.chatSocket.onmessage=function(e)
    {
      var data = JSON.parse(e.data);
      var message = data['message'];
      console.log(message);
      // document.querySelector('#chat-log').value += (message + '\n');
    }
    this.chatSocket.onopen=function(e)
    {
      console.log("Socket Connected");
    }
    this.chatSocket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
    };
  }

  send()
  {
    const token=window.localStorage.getItem("token");
    const date=new Date().toLocaleDateString();
    const time=new Date().toLocaleTimeString();
    console.log(date);
    console.log(time);
    this.chatSocket.send(JSON.stringify({
      'message':this.chatForm.value.message,
      'token':token,
      'roomid':this.id
    }))
    this.chatForm.reset()
  }
}
