import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { JWT } from '../../_data/model/jwt';
import { AuthService } from '../../_data/service/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // account: Account;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  opened: boolean;
  disable: boolean;

  jwt: JWT | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    mediaMatcher: MediaMatcher
  ) {
    // this.authService.verify()
    // this.account = this.authService.account()
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.opened = !this.mobileQuery.matches;
    this.disable = this.mobileQuery.matches;
    this.mobileQuery.addEventListener('change', (event) => {
      this.opened = !event.matches
      this.disable = event.matches
      return this._mobileQueryListener
    });
  }

  ngOnInit() {
    this.getAccount()
    // this.authService.jwt.observe(this, (jwt) => {
    //   this.jwt = jwt
    // })
    // this.authService.account()
  }

  getAccount() {
    this.authService.account().then((account) => {
      switch (account.role) {
        case 0:
          this.navigate('dashboard/admin');
          break;
        case 1:
          this.navigate('dashboard/office');
          break;
        case 2:
          this.navigate('dashboard/field');
          break;
        default:
          console.log(account)
          break;
      }
    }).catch((err) => {
      console.error(err)
      this.router.navigate(['/login']);
    })
  }

  navigate(target: string) {
    this.router.navigateByUrl(target);
  }



  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
