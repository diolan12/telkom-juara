import { Injectable } from '@angular/core';
import { Account } from '../model/account';

const JWT_KEY = 'auth-token';
const ACCOUNT_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor() { }

  clear(): void {
    window.localStorage.clear();
  }

  public setJWT(token: string): void {
    window.localStorage.removeItem(JWT_KEY);
    window.localStorage.setItem(JWT_KEY, JSON.parse(token));
  }

  public getJWT(): string | null {
    return window.localStorage.getItem(JWT_KEY);
  }

  public setAccount(account: Account): void {
    window.localStorage.removeItem(ACCOUNT_KEY);
    window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  }

  public getAccount(): Account | null {
    const account = window.localStorage.getItem(ACCOUNT_KEY);
    if (account) {
      return JSON.parse(account);
    }
    return null
  }
}
