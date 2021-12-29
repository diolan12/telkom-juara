import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  private dateTime: Date
  constructor() {
    this.dateTime = new Date();
  }
  UTCtoLocal(date: Date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = this.dateTime.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  getDayName(dayOfWeek: number): string {
    switch (dayOfWeek) {
      case 0: return 'Minggu';
      case 1: return 'Senin';
      case 2: return 'Selasa';
      case 3: return 'Rabu';
      case 4: return 'Kamis';
      case 5: return 'Jumat';
      case 6: return 'Sabtu';
    }
    return '';
  }
}
