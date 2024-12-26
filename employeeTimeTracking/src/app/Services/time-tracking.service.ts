import { Injectable } from '@angular/core';
import { TimeLog } from '../Models/TimeLog.model';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingService {
  private logs: TimeLog[] = [];

  addLog(employeeName: string, timeIn: string, timeOut: string, totalHoursWorked: number): void {
    console.log('Adding log to service:', employeeName, timeIn, timeOut, totalHoursWorked);

    this.logs.push({ employeeName, timeIn, timeOut, totalHours: totalHoursWorked });
    console.log('Logs after addition:', this.logs);
  }

  getLogs(): TimeLog[] {
    return this.logs;
  }
}
