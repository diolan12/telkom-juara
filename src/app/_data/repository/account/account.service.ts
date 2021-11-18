import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from 'src/app/_data/model/account';
import { AccountPostDao, AccountPutDao } from '../../dao/account-dao';

// injectable account service with get, create, update, delete method
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient) { }

  // function to get all account returning promise of account array
  // require parameters of nullable id and boolean field
  get(id: number | null = null, field: boolean = false): Promise<Array<Account>> {
    return new Promise<Array<Account>>((resolve, reject) => {
      // blank url then decide whether id is null or not
      // if id is null then get all account
      // else get account by id
      let url = ''
      if (id === null) {
        // url for get all account
        url = environment.apiUrl + '/api/account'
      } else if (field) {
        // url for get account where the role is Petugas Lapangan
        url = environment.apiUrl + '/api/account?where=role-is-2'
      } else {
        // url for get account by id
        url = environment.apiUrl + '/api/account/' + id
      }
      this.http.get<Array<Account>>(url).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }

  // function to create new account by parameter of account method POST dao returning promise of account
  // require parameter of account POST dao
  create(accountPostDao: AccountPostDao): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      this.http.post<Account>(environment.apiUrl + '/api/account', accountPostDao).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }

  // function to update account by parameter of account method PUT dao returning promise of account
  // require parameters of account id and account PUT dao
  update(id: number, accountPutDao: AccountPutDao): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      this.http.put<Account>(environment.apiUrl + '/api/account/' + id, accountPutDao).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }
  getRoleDisplay(role: number): string {
    switch (role) {
      case 0: return 'Administrator';
      case 1: return 'Petugas Kantor';
      case 2: return 'Petugas Lapangan';
    }
    return ''
  }
}
