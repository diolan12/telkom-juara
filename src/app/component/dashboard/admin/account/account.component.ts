import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'src/app/_data/model/account';
import { AccountService } from 'src/app/_data/repository/account/account.service';
import { NewAccountDialogComponent } from './dialog/new-account-dialog/new-account-dialog.component';
import { EditAccountDialogComponent } from './dialog/edit-account-dialog/edit-account-dialog.component';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nik', 'name', 'role', 'phone', 'whatsapp'];
  dataSource = new MatTableDataSource(Array<Account>());

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.init()
  }

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  async init() {
    await this.accountService.get().then((accounts: Array<Account>) => {
      this.dataSource = new MatTableDataSource(accounts);
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
      width: '400px',
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
      width: '400px',
      data: account
    })
    console.log(account);
    editDialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed with data:');
      console.log(data);
    })
  }
  roleDisplay(role: number): string {
    return this.accountService.getRoleDisplay(role)
  }

}

