import { Component, OnInit } from '@angular/core';

import { JWT } from 'src/app/_data/model/jwt';
import { AuthService } from 'src/app/_data/service/auth.service'

@Component({
  selector: 'app-shared-sidenav',
  templateUrl: './shared-sidenav.component.html',
  styleUrls: ['./shared-sidenav.component.css']
})
export class SharedSidenavComponent implements OnInit {

  jwt: JWT | null = null;

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.authService.account().then((jwt) => {
      this.jwt = jwt
    }).catch((err) => {
      console.error(err)
    })
    // this.authService.jwt.observe(this, (jwt) => {
    //   this.jwt = jwt
    // })
    // this.authService.account()
  }

}
