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

  isAttend: boolean = false

  selected: Date | null = null;
  text: string = '';

  dateTime: Date

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
  }

  ngOnInit(): void {
    this.initData()
  }

  select(event: Date | null) {
    // this.dateTime = event
    // this.render()
    if (event != null) {
      this.attendances.some(attendance => {
        if (event.getDate() == attendance.getDate() && event.getMonth() == attendance.getMonth() && event.getFullYear() == attendance.getFullYear()) {
          this.text = "Anda absen pada " + this.datetimeService.timeStringFormat(attendance)
      this.toastr.success("Anda absen pada " + this.datetimeService.timeStringFormat(attendance), this.datetimeService.dateStringFormat(attendance))
          return true
        } else {
          this.text = ''
          return false
        }
      })
    }
  }
  private async initData() {
    await this.authService.account().then(account => {
      this.account = account
    })
    await this.attendanceService.get(this.account?.id).then(attendances => {
      attendances.map(attendance => {
        console.log(attendance.created_at)
        // let utc = new Date(new Date(Date.parse(attendance.created_at)).toISOString())
        let local = new Date(attendance.created_at)//this.datetimeService.UTCStringtoLocal(attendance.created_at)
        this.attendances.push(local)
        // console.log(utc.toISOString())
        console.log(local.toString())
        if (local.getDate() == this.dateTime.getDate() && local.getMonth() == this.dateTime.getMonth() && local.getFullYear() == this.dateTime.getFullYear()) {
          this.isAttend = true
        }
      })
    })
    this.render()
    console.log(this.attendances)
  }
  
  render() {
    this.calendar.dateClass = this.dateClass
    this.calendar.updateTodaysDate()

  }
  roleCall() {
    let data = {
      account: this.account!.id
    }
    this.attendanceService.create(data).then((response) => {
      this.toastr.success("Anda absen pada tanggal " + this.datetimeService.parse(response.created_at).toLocaleDateString(), "Berhasil Absen")
    }).catch((response) => {
      this.toastr.error("Server error: " + response.message, "Gagal Absen")
    }).finally(() => {
      this.render()
      // window.location.reload()
      this.initData()
    })
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    let markedDates: Array<number> = []
    // console.log(this.attendances)
    this.attendances.map(attendance => {
      if (cellDate.getMonth() === attendance.getMonth()) {
        markedDates.push(attendance.getDate())
        // console.log(attendance.getDate())
      }
    })
    if (view === 'month') {
      const date = cellDate.getDate();

      return markedDates.includes(date) ? 'marked-date' : '';
      // return date === 1 || date === 20 ? 'marked-date' : '';
    }

    return '';
  };

}
