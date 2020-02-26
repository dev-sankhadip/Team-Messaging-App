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
  public months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']


  chatForm=new FormGroup({
    message:new FormControl('')
  })


  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.setSocket();
    this.service.checkIfInRoom(this.id)
    .subscribe((res1)=>
    {
      this.isValid=true;
      this.getChats();
    },(err)=>
    {
      this.isValid=false
      console.log(err);
      if(err.error=='Unauthorised')
      {
        this.getChats();
      }
    })
  }

  getChats()
  {
    this.service.getChats(this.id)
    .subscribe((res2)=>
    {
      console.log(res2);
      this.chats=res2['chats'];
    },(err)=>
    {
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
    const username=window.localStorage.getItem('username');
    const year=new Date().getFullYear();
    const month=this.months[new Date().getMonth()];
    const date=new Date().getDate();
    const time=new Date().toLocaleTimeString();
    let chatArray=[username,this.chatForm.value.message,time+' '+month+' '+date+', '+year];
    this.chats.push(chatArray);
    this.chatSocket.send(JSON.stringify({
      'message':this.chatForm.value.message,
      'token':token,
      'roomid':this.id,
      'times':time+' '+month+' '+date+', '+year
    }))
    this.chatForm.reset()
  }

  join()
  {
    this.service.joinRoom(this.id)
    .subscribe((res)=>
    {
      console.log(res);
    },(err)=>
    {
      console.log(err);
    })
  }
}
