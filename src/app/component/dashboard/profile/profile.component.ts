import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/_data/model/account';
import { AuthService } from 'src/app/_data/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  background = environment.apiUrl+'/assets/image/background.jpg'

  account: Account | null = null;
  role: string = ""

  constructor(
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.account().then((account) => {
      this.account = account
      switch (account.role) {
        case 0:
          this.role = "Administrator"
          break;
        case 1:
          this.role = "Petugas Kantor"
          break;
        case 2:
          this.role = "Petugas Lapangan"
          break;
      }

    }).catch((err) => {
      console.error(err)
    })
  }

}
