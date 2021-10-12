import { Injectable } from '@angular/core';
import { JWT } from '../model/jwt';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor() { }

  clear(): void {
    window.localStorage.clear();
  }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, JSON.parse(token));
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public setJWT(account: JWT): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(account));
  }

  public getJWT(): JWT | null {
    const account = window.localStorage.getItem(USER_KEY);
    if (account) {
      return JSON.parse(account);
    }
    return null
  }
}
