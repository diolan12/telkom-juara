import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account, AccountDto } from 'src/app/_data/model/account';

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
    console.log(field);
    return new Promise<Array<Account>>((resolve, reject) => {
      // blank url then decide whether id is null or not
      // if id is null then get all account
      // else get account by id
      let url = ''
      if (id === null) {
        if (field) {
          // url for get account where the role is Petugas Lapangan
          url = environment.apiUrl + '/api/account?where=role->-0&clean'
        } else {
          // url for get all account
          url = environment.apiUrl + '/api/account?clean'
        }
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
  // require parameter of account dao
  create(accountDto: AccountDto): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      this.http.post<Account>(environment.apiUrl + '/api/account', accountDto).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }

  // function to update account by parameter of account method PUT dao returning promise of account
  // require parameters of account id and account PUT dao
  update(id: number, accountDto: AccountDto): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      this.http.put<Account>(environment.apiUrl + '/api/account/' + id, accountDto).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }

  // function to delete account by parameter of account id returning promise of account array
  // require parameters of account id
  delete(id: number): Promise<Array<Account>> {
    return new Promise<Array<Account>>((resolve, reject) => {
      this.http.delete<Array<Account>>(environment.apiUrl + '/api/account/' + id).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }

  // function to get string value of role number, require parameter of role number
  // 0 will be Administrator, 1 will be Petugas Lapangan, 2 will be Pelanggan, else will be blank
  getRoleValue(role: number): string {
    switch (role) {
      case 0: return 'Administrator';
      case 1: return 'Petugas Kantor';
      case 2: return 'Petugas Lapangan';
    }
    return ''
  }
}
