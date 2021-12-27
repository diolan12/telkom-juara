import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/_data/model/account';
import { Attendance, AttendanceDTO } from 'src/app/_data/model/attendance';
import { AttendanceService } from 'src/app/_data/repository/attendance/attendance.service';
import { AuthService } from 'src/app/_data/service/auth.service';
import { DatetimeService } from 'src/app/_data/service/datetime/datetime.service';

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

  account: Account | null = null;
  attendances: Array<Date> = []

  @ViewChild('calendar')
  calendar!: MatCalendar<Date>;

  constructor(
    private datetimeService: DatetimeService,
    private authService: AuthService,
    private attendanceService: AttendanceService,
    private toastr: ToastrService
  ) {
    this.dateTime = new Date()
    this.datesThisMonth = new Date(this.dateTime.getFullYear(), this.dateTime.getMonth(), 0).getDate()
    this.dates = new Array<number>(this.datesThisMonth).fill(0).map((x,i) => i+1)
    this.firstDayOfMonth = new Date(this.dateTime.getFullYear(), this.dateTime.getMonth(), 1).getDay()
    this.blankDateSpaces = Array(this.firstDayOfMonth - 1).fill(0).map((x,i)=>i)
    console.log(this.blankDateSpaces.length)
    this.today = this.dateTime.getDate()
    // this.calender = document.getElementById('calender')
  }

  ngOnInit(): void {
    
    this.initData()
  }
  isAttend: boolean = false
  private async initData() {
    await this.authService.account().then(account => {
      this.account = account
    })
    await this.attendanceService.get(this.account?.id).then(attendances => {
      attendances.map(attendance => {
        console.log(attendance.created_at)
        let utc = new Date(new Date(Date.parse(attendance.created_at)).toISOString()) 
        let local = this.datetimeService.UTCtoLocal(utc)
        this.attendances.push(local)
        console.log(utc.toISOString())
        console.log(local.toString())
        if (local.getDate() == this.dateTime.getDate() && local.getMonth() == this.dateTime.getMonth() && local.getFullYear() == this.dateTime.getFullYear()) {
          this.isAttend = true
        }
      })
      // this.attendances = attendances
      // this.calendar.dateClass = this.dateClas
    })
    this.render()
    console.log(this.attendances)
  }
  render() {
    this.calendar.dateClass = this.dateClas
    this.calendar.updateTodaysDate()
    
  }
  roleCall() {
    let data = {
      account: this.account!.id
    }
    this.attendanceService.create(data).then((response) => {
      this.toastr.success("Anda absen pada tanggal "+this.datetimeService.UTCtoLocal(new Date(response.created_at)).toLocaleDateString(), "Berhasil Absen")
    }).catch((response) => {
      this.toastr.error("Server error: "+response.message, "Gagal Absen")
    }).finally(() => {
      this.render()
      // window.location.reload()
      this.initData()
    })
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
    let markedDates: Array<number> = []
    // console.log(this.attendances)
    this.attendances.map(attendance => {
      if(cellDate.getMonth() === attendance.getMonth()) {
        markedDates.push(attendance.getDate())
        // console.log(attendance.getDate())
      }
    })
    if (view === 'month' ) {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return markedDates.includes(date) ? 'marked-date' : '';
      // return date === 1 || date === 20 ? 'marked-date' : '';
    }

    return '';
  };

}
