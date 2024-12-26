import { EventEmitter, Injectable } from '@angular/core';
import { Chat } from '../models/chat.model';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages: BehaviorSubject<Chat[]> = new BehaviorSubject<Chat[]>([]);
  messages$ = this.messages.asObservable();

  // messageAdded = new EventEmitter<Chat>();

  sendMessage(senderId: number, receiverId: number, message: string) {
    const chat: Chat = {
      senderId,
      receiverId,
      message,
      time: new Date().toLocaleTimeString(),
    };
    
    this.messages.next([...this.messages.value, chat]);
    // this.messageAdded.emit(chat); 
  }
}
