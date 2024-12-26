import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TimeTrackingService } from './Services/time-tracking.service';
import { TimeLog } from './Models/TimeLog.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  timeLogForm!: FormGroup;
  timeLogs: TimeLog[] = [];

  constructor(private timeTrackingService: TimeTrackingService) { }

  ngOnInit(): void {
    this.timeLogForm = new FormGroup({
      employeeName: new FormControl('', Validators.required),
      timeIn: new FormControl('', Validators.required),
      timeOut: new FormControl('', Validators.required),
    });

    this.timeLogs = this.timeTrackingService.getLogs();
  }

  submitLog(): void {
    if (this.timeLogForm.valid) {
      const { employeeName, timeIn, timeOut } = this.timeLogForm.value;
  
      const [inHours, inMinutes] = timeIn.split(':').map(Number);
      const [outHours, outMinutes] = timeOut.split(':').map(Number);

      const timeInTotalMinutes = inHours * 60 + inMinutes;
      const timeOutTotalMinutes = outHours * 60 + outMinutes;

      let totalMinutesWorked = timeOutTotalMinutes - timeInTotalMinutes;
  
      if (totalMinutesWorked < 0) {
        totalMinutesWorked += 1440; 
      }
  
      const totalHoursWorked = totalMinutesWorked / 60;

      console.log('Adding log:', employeeName, timeIn, timeOut, totalHoursWorked);

      this.timeTrackingService.addLog(employeeName, timeIn, timeOut, totalHoursWorked);

      this.timeLogForm.reset();
      this.timeLogs = this.timeTrackingService.getLogs();
  
      console.log('Updated logs:', this.timeLogs);
    }
  }
}