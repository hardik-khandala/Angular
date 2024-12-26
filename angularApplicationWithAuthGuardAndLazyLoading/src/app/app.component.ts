import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './guard/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myApp';
  constructor(public authService: AuthService) { }

  
}
