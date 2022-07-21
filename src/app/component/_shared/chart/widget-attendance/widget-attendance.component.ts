import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/_data/model/account';
import { AttendanceService } from 'src/app/_data/repository/attendance/attendance.service';
import { AuthService } from 'src/app/_data/service/auth.service';
import { DatetimeService } from 'src/app/_data/service/datetime/datetime.service';

@Component({
  selector: 'app-widget-attendance',
  templateUrl: './widget-attendance.component.html',
  styleUrls: ['./widget-attendance.component.css']
})
export class WidgetAttendanceComponent implements OnInit {

  isAttend: boolean = false
  
  text: string = '';

  dateTime: Date
  
  account: Account | null = null;
  attendances: Array<Date> = []

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
    this.text = "Pukul "+ this.dateTime.toLocaleTimeString('id-ID', { hour12: false })
    if (this.isAttend) {
      this.text = "Anda absen pada jam " + this.dateTime.toLocaleTimeString('id-ID', { hour12: false })
    } else {
      this.text = 'Anda belum absen'
    }
  }

  private async initData() {
    await this.authService.account().then(account => {
      this.account = account
    })
    await this.attendanceService.get(this.account?.id).then(attendances => {
      attendances.map(attendance => {
        // console.log(attendance.created_at)
        // let utc = new Date(new Date(Date.parse(attendance.created_at)).toISOString())
        let local = this.datetimeService.UTCStringtoLocal(attendance.created_at)
        this.attendances.push(local)
        // console.log(utc.toISOString())
        // console.log(local.toString())
        if (local.getDate() == this.dateTime.getDate() && local.getMonth() == this.dateTime.getMonth() && local.getFullYear() == this.dateTime.getFullYear()) {
          this.isAttend = true
        }
      })
    })
    // this.render()
    console.log(this.attendances)
  }

}
