import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  opened: boolean;
  disable: boolean;

  routerUrlParamCount: number = 0

  jwt: JWT | null = null;

  constructor(
    private router: Router,
    public location: Location,
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    mediaMatcher: MediaMatcher
  ) {
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.opened = !this.mobileQuery.matches;
    this.disable = this.mobileQuery.matches;
    this.mobileQuery.addEventListener('change', (event) => {
      this.opened = !event.matches
      this.disable = event.matches
      return this._mobileQueryListener
    });
    this.router.events.subscribe(() => {
      this.routerUrlParamCount = this.router.url.split('/').length
      // console.log(this.routerUrlParamCount)
    })
  }

  ngOnInit() {
    this.getAccount()
  }

  async getAccount() {
    await this.authService.account().then((account) => {
      switch (account.role) {
        case 0:
          if (this.router.url.split('/')[2] != 'admin'){
            this.navigate('dashboard/admin');
          }
          break;
        case 1:
          if (this.router.url.split('/')[2] != 'office'){
            this.navigate('dashboard/office');
          }
          break;
        case 2:
          if (this.router.url.split('/')[2] != 'field'){
            this.navigate('dashboard/field');
          }
          break;
        default:
          console.log(account)
          break;
      }
    }).catch((err) => {
      console.error(err)
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
