import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { CredentialService } from '../storage/credential.service';
import { LoginDTO } from '../dao/login-dto';
import { Response } from '../model/response'
import { environment } from 'src/environments/environment';
import { Account } from '../model/account';
// import LiveData from '../jetpack/LiveData';
// import MutableLiveData from '../jetpack/MutableLiveData';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private credential: CredentialService
  ) { }

  login(loginDao: LoginDTO): Promise<Response<string>> {
    console.log('login()')
    return new Promise((resolve, reject) => {
      this.http.post<Response<string>>(environment.apiUrl + '/auth/login', loginDao, httpOptions).toPromise()
      .then((res) => {
        if (res.type === 'SUCCESS') {
          resolve(res)
          this.credential.setJWT(JSON.stringify(res.content));
        } else {
          reject(res)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  verify(): Promise<Response<Account>> {
    console.log('verify()')
    return new Promise((resolve, reject) => {
      if (this.isLoggedIn()) {
        this.http.get<Response<Account>>(environment.apiUrl + '/auth/verify').toPromise()
          .then(
            (res) => {
              resolve(res)
            })
          .catch(err => { reject(err) })
      } else {reject('Not Logged In')}
    });
  }

  account(): Promise<Account> {
    console.log('account()')
    return new Promise((resolve, reject) => {
      let account = this.credential.getAccount()
      if (account) {
        // this._jwt.postValue(account) // experimental
        resolve(account)
      } else {
        this.verify()
          .then(
            (res) => {
              if (res.type === 'ERROR') {
                reject(res)
              } else {
                this.credential.setAccount(res.content)
                // this._jwt.postValue(res.message) // experimental
                resolve(res.content)
              }
            })
          .catch(err => { reject(err) })
      }
    })
  }

  // protected _jwt = new MutableLiveData<JWT>() // experimental
  // jwt: LiveData<JWT> = this._jwt // experimental
  

  isLoggedIn(): boolean {
    return (this.credential.getJWT() !== null)
  }

  logout(): void {
    this.credential.clear()
  }

}
