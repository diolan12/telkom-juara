import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/_data/model/account';

import { AuthService } from 'src/app/_data/service/auth.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shared-sidenav',
  templateUrl: './shared-sidenav.component.html',
  styleUrls: ['./shared-sidenav.component.css']
})
export class SharedSidenavComponent implements OnInit {

  account: Account | null = null;

  background = environment.apiUrl+'/assets/image/background.jpg'

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.authService.account().then((account) => {
      this.account = account
    }).catch((err) => {
      console.error(err)
    })
  }

}
