import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Attendance, AttendanceDTO } from '../../model/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private http: HttpClient) { }

  get(account: number | null = null): Promise<Array<Attendance>> {
    let url = ''
    if (account === null) {
      url = environment.apiUrl + '/api/attendance?relation'
    } else {
      url = environment.apiUrl + '/api/attendance?relation&where=account.is.' + account + '&clean'
    }
    return new Promise<Array<Attendance>>((resolve, reject) => {
      this.http.get<Array<Attendance>>(url).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }

  create(attendanceDTO: AttendanceDTO): Promise<Attendance> {
    return new Promise<Attendance>((resolve, reject) => {
      this.http.post<Attendance>(environment.apiUrl + '/api/attendance', attendanceDTO).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }
}
