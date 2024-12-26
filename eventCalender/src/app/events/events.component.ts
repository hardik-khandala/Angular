import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  currentDate!: Date | null;
  events: string[] = [];
  newEvent: string = '';
  isAddingEvent = false;

  private eventStore: { [key: string]: string[] } = {};

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const dateParam = params['date'];
      if (dateParam) {
        this.currentDate = new Date(dateParam);
        this.loadEvents();
      } else {
        this.currentDate = null;
      }
    });
  }

  onDateSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.currentDate = new Date(input.value);
      this.updateDateQueryParam(this.currentDate);
    }
  }

  loadEvents(): void {
    const dateKey = this.currentDate!.toISOString().split('T')[0];
    this.events = this.eventStore[dateKey] || [];
  }

  navigateToPreviousDay(): void {
    const previousDate = new Date(this.currentDate!);
    previousDate.setDate(this.currentDate!.getDate() - 1);
    this.updateDateQueryParam(previousDate);
  }

  navigateToNextDay(): void {
    const nextDate = new Date(this.currentDate!);
    nextDate.setDate(this.currentDate!.getDate() + 1);
    this.updateDateQueryParam(nextDate);
  }

  updateDateQueryParam(date: Date): void {
    this.router.navigate([], {
      queryParams: { date: date.toISOString().split('T')[0] },
      queryParamsHandling: 'merge'
    });
  }

  openAddEvent(): void {
    this.isAddingEvent = true;
  }

  closeAddEvent(): void {
    this.isAddingEvent = false;
    this.newEvent = '';
  }

  addEvent(): void {
    if (this.newEvent.trim()) {
      const dateKey = this.currentDate!.toISOString().split('T')[0];
      if (!this.eventStore[dateKey]) {
        this.eventStore[dateKey] = [];
      }
      this.eventStore[dateKey].push(this.newEvent.trim());
      this.loadEvents();
      this.closeAddEvent();
    }
  }
}