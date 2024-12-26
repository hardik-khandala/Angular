import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from './models/user.model';
import { Chat } from './models/chat.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'myApp';
  users: User[] = [
    { id: 1, name: 'Hardik' },
    { id: 2, name: 'Harsh' },
    { id: 3, name: 'Kunj' },
  ];

  sender!: number;
  receiver!: number;
  message!: string;
  messages: Chat[] = [];
  filteredMessages: Chat[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.messages$.subscribe((messages) => {
      this.messages = messages;
      this.filterMessages();
    });
  }

  sendMessage() {
    if (this.sender && this.receiver && this.message.trim()) {
      this.chatService.sendMessage(this.sender, this.receiver, this.message);
      this.message = '';
    }
  }

  filterMessages() {
    this.filteredMessages = this.messages.filter(
      (msg) =>
        (msg.senderId === this.sender && msg.receiverId === this.receiver) ||
        (msg.senderId === this.receiver && msg.receiverId === this.sender)
    );
  }

  onDropdownChange() {
    this.filterMessages();
  }
}

