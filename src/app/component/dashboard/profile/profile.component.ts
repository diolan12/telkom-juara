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

  constructor(
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.account().then((account) => {
      this.account = account
    }).catch((err) => {
      console.error(err)
    })
  }

}
