import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { CredentialService } from '../storage/credential.service';
import { LoginDao } from '../dao/login-dao';
import { Response } from '../model/response'
import { JWT } from '../model/jwt';
import { environment } from 'src/environments/environment';
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

  login(loginDao: LoginDao): Promise<Response> {
    console.log('login()')
    return new Promise((resolve, reject) => {
      this.http.post<Response>(environment.apiUrl + '/auth/login', loginDao, httpOptions).toPromise()
      .then((res) => {
        res as Response
        if (res.type === 'SUCCESS') {
          resolve(res)
          this.credential.setToken(JSON.stringify(res.message));
        } else {
          reject(res)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  verify(): Promise<Response> {
    console.log('verify()')
    return new Promise((resolve, reject) => {
      if (this.isLoggedIn()) {
        let httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + this.credential.getToken() })
        }
        this.http.get<Response>(environment.apiUrl + '/auth/verify').toPromise()
          .then(
            (res: Response) => {
              resolve(res)
            })
          .catch(err => { reject(err) })
      } else {reject('Not Logged In')}
    });
  }

  account(): Promise<JWT> {
    console.log('account()')
    return new Promise((resolve, reject) => {
      let account = this.credential.getJWT()
      if (account) {
        // this._jwt.postValue(account) // experimental
        resolve(account)
      } else {
        this.verify()
          .then(
            (res: Response) => {
              if (res.type === 'ERROR') {
                reject(res)
              } else {
                this.credential.setJWT(res.message)
                // this._jwt.postValue(res.message) // experimental
                resolve(res.message)
              }
            })
          .catch(err => { reject(err) })
      }
    })
  }

  // protected _jwt = new MutableLiveData<JWT>() // experimental
  // jwt: LiveData<JWT> = this._jwt // experimental
  

  isLoggedIn(): boolean {
    return (this.credential.getToken() !== null)
  }

  logout(): void {
    this.credential.clear()
  }

}
