import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
declare const $;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  private socket;
  private name:string;
  constructor() {
    this.socket = io('http://localhost:3000');

    const listener = Observable.fromEvent(this.socket, 'message');
    listener.subscribe((data) => {
      console.log(data);
      let str = '<li>'+data+'</li>';
      $('#messages').append( str);
    });
    this.socket.on('usernames', function (data) {
      console.log(data);
      let html = '';
      data.forEach(function (user) {
        html+=user+'...'+'<br>';
      });
      $('#users').html('');
      $('#users').append(html);
    });
    // const listenerUsers = Observable.fromEvent(this.socket, 'usernames');
    // listenerUsers.subscribe((data) => {
    //   console.log(typeof data);
    //   let html = '';
    //   //for (let i=0; i<data.length; )
    //   //$('users')
    // });

  }

  enterName(name){
    console.log(name);
    console.log(this.name);
    this.socket.emit('new user', this.name, function (data) {
      if (data){
        console.log('Yes');
      }else{
        console.log('No');
      }
    });
  }

  send(msg) {
    msg = this.name+': ' + msg;
    this.socket.emit('message', msg);
    $('#messages').append('<li>'+ msg+'</li>');
    $('#m').val('');
  }

  secretRoomEnter(){
    this.socket.emit('room', 'room');
    this.socket.on('for', function (data) {
      console.log(data);
    });
  }

  ngOnInit(){
    $('#m').css("color", "blue");
  }
}
