import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from 'src/app/_data/model/account';
import { AccountPostDao, AccountPutDao } from '../../dao/account-dao';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient) { }

  get(id: number | null = null): Promise<Array<Account>> {
    return new Promise<Array<Account>>((resolve, reject) => {
      let url = ''
      if (id === null) {
        url = environment.apiUrl + '/api/account'
      } else {
        url = environment.apiUrl + '/api/account/' + id
      }
      this.http.get<Array<Account>>(url).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }

  new(accountPostDao: AccountPostDao): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      this.http.post<Account>(environment.apiUrl + '/api/account', accountPostDao).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }
  update(id: number, accountPutDao: AccountPutDao): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      this.http.put<Account>(environment.apiUrl + '/api/account/' + id, accountPutDao).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }
}
