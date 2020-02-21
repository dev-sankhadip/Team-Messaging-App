import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms'



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor( private route:ActivatedRoute ) { }

  public id:String
  public chatSocket
  public socketURL='127.0.0.1:8000'

  chatForm=new FormGroup({
    message:new FormControl('')
  })


  ngOnInit(): void {
    this.setSocket();
  }

  setSocket()
  {
    this.id=this.route.snapshot.params['id'];
    console.log(this.id)
    this.chatSocket = new WebSocket('ws://' + this.socketURL + '/ws/chat/' + this.id + '/');
    let socketCon=this.chatSocket;
    this.chatSocket.onmessage=function(e)
    {
      console.log(e);
      var data = JSON.parse(e.data);
      var message = data['message'];
      document.querySelector('#chat-log').value += (message + '\n');
    }
    this.chatSocket.onopen=function(e)
    {
      console.log(e);
    }
    this.chatSocket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
    };
  }

  send()
  {
    console.log(this.chatForm.value);
    this.chatSocket.send(JSON.stringify({
      'message':this.chatForm.value.message
    }))
    this.chatForm.reset()
  }
}
