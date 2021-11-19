import { Component,  AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'src/app/_data/model/account';
import { AccountService } from 'src/app/_data/repository/account/account.service';
import { NewAccountDialogComponent } from './dialog/new-account-dialog/new-account-dialog.component';
import { EditAccountDialogComponent } from './dialog/edit-account-dialog/edit-account-dialog.component';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements  AfterViewInit {
  // string array for table headers
  displayedColumns: string[] = ['nik', 'name', 'role', 'phone', 'whatsapp'];

  // blank mat-table data source
  dataSource = new MatTableDataSource(Array<Account>());

  // non-static material table sort initialization
  @ViewChild(MatSort, {static: false}) sort: MatSort = new MatSort();


  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
  ) { 
  }


  ngAfterViewInit(): void {
    this.getAccounts()
  }

  // async await get all accounts from server, then set data source and sort
  async getAccounts() {
    await this.accountService.get().then((accounts: Array<Account>) => {
      this.dataSource = new MatTableDataSource(accounts);
      this.dataSource.sort = this.sort;
    })
      .catch(err => {
        console.error(err)
      })
  }

  newAccountDialog() {
    // let d: AccountPostDao = {
    //   nik: '',
    //   email: '',
    //   name: '',
    //   gender: '',
    //   phone:'', 
    //   whatsapp: '', 
    //   role: 2, 
    //   password: ''
    // };
    const newDialogRef = this.dialog.open(NewAccountDialogComponent, {
      width: environment.modalWidth,
      // data: d
    })
    newDialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed with data:');
      console.log(data);
      this.accountService.get().then((accounts: Array<Account>) => {
        this.dataSource = new MatTableDataSource(accounts);
      })
    })
  }

  editAccountDialog(account: Account) {
    const editDialogRef = this.dialog.open(EditAccountDialogComponent, {
      width: environment.modalWidth,
      data: account
    })
    console.log(account);
    editDialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed with data:');
      console.log(data);
    })
  }
  roleDisplay(role: number): string {
    return this.accountService.getRoleValue(role)
  }

}

