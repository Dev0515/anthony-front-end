import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ChatService {
  private url = 'http://localhost:8080/';
    private socket; 
  constructor() {
    this.socket = io.connect(this.url);
   }

   public sendMessage(message,userid,otherid) {
   this.socket.emit('new-message',message,userid,otherid);
 }
public getMessages = () => {
  return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
          observer.next(message);
            });
      });
    }
}
