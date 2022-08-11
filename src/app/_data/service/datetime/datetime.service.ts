import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  private dateTime: Date
  constructor() {
    this.dateTime = new Date();
  }
  parse(i18nDatetime: string): Date {
    return new Date(i18nDatetime);
  }
  
  timeStringFormat(date: Date | string): string{
    if (typeof date === 'string') {
      date = this.parse(date)
    }
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }
  dateStringFormat(date: Date): string {
    if (typeof date === 'string') {
      date = this.parse(date)
    }
    return this.getDayName(date.getDay()) + ', ' + date.getDate() + ' ' + this.getMonthName(date.getMonth()) + ' ' + date.getFullYear();
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
  getMonthName(month: number): string {
    switch (month) {
      case 0: return 'Januari';
      case 1: return 'Februari';
      case 2: return 'Maret';
      case 3: return 'April';
      case 4: return 'Mei';
      case 5: return 'Juni';
      case 6: return 'Juli';
      case 7: return 'Agustus';
      case 8: return 'September';
      case 9: return 'Oktober';
      case 10: return 'November';
      case 11: return 'Desember';
    }
    return '';
  }
  getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
}
