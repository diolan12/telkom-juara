import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  selected: Date | null = null;

  dateTime: Date
  datesThisMonth: number
  dates: number[]
  firstDayOfMonth: number
  blankDateSpaces: Array<number>

  today: number


  constructor() {
    this.dateTime = new Date()
    this.datesThisMonth = new Date(this.dateTime.getFullYear(), this.dateTime.getMonth(), 0).getDate()
    this.dates = new Array<number>(this.datesThisMonth).fill(0).map((x,i) => i+1)
    this.firstDayOfMonth = new Date(this.dateTime.getFullYear(), this.dateTime.getMonth(), 1).getDay()
    this.blankDateSpaces = Array(this.firstDayOfMonth - 1).fill(0).map((x,i)=>i)
    console.log(this.blankDateSpaces)
    this.today = this.dateTime.getDate()
  }

  ngOnInit(): void {
  }

  getMonth(): string {
    let m = this.dateTime.getMonth() + 1
    let month = ""

    // generate switch statement to choose month
    switch (m) {
      case 1: month = 'Januari'; break
      case 2: month = 'Februari'; break
      case 3: month = 'Maret'; break
      case 4: month = 'April'; break
      case 5: month = 'Mei'; break
      case 6: month = 'Juni'; break
      case 7: month = 'Juli'; break
      case 8: month = 'Agustus'; break
      case 9: month = 'September'; break
      case 10: month = 'Oktober'; break
      case 11: month = 'November'; break
      case 12: month = 'Desember'; break
    }
    return month
  }
  dateClas: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view and only in december.
    if (view === 'month' && cellDate.getMonth() === 11) {
      const date = cellDate.getDate();
      console.log(date)

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'marked-date' : '';
    }

    return '';
  };

}
