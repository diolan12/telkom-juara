import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Account } from 'src/app/_data/model/account';
import { AccountService } from 'src/app/_data/repository/account/account.service';
import { AuthService } from 'src/app/_data/service/auth.service';
import { AccountDialogComponent } from './dialog/account-dialog/account-dialog.component';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements AfterViewInit {
  account: Account | null = null;

  // string array for table headers
  displayedColumns: string[] = ['nik', 'name', 'role', 'phone', 'whatsapp'];

  // blank mat-table data source
  dataSource = new MatTableDataSource(Array<Account>());

  // non-static material table sort initialization
  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort();

  constructor(
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService,
    public dialog: MatDialog,
  ) {
    this.authService.account().then((account) => {
      this.account = account
    }).catch((err) => {
      console.error(err)
    })
  }

  ngAfterViewInit(): void {
    this.getAccounts()
  }

  // async await get all accounts from server, then set data source and sort
  async getAccounts() {
    await this.accountService.get(null, this.account?.role == 1).then((accounts: Array<Account>) => {
      this.dataSource = new MatTableDataSource(accounts);
      this.dataSource.sort = this.sort;
    })
      .catch(err => {
        if (err.status == 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        console.error(err)
      })
  }

  newAccountDialog() {
    const newDialogRef = this.dialog.open(AccountDialogComponent, {
      width: environment.modalWidth
    });
    newDialogRef.afterClosed().subscribe(() => {
      this.getAccounts();
    });
  }

  editAccountDialog(account: Account) {
    const newDialogRef = this.dialog.open(AccountDialogComponent, {
      width: environment.modalWidth,
      data: account
    });
    newDialogRef.afterClosed().subscribe(() => {
      this.getAccounts();
    });
  }

  roleDisplay(role: number) {
    return this.accountService.getRoleValue(role)
  }

}
