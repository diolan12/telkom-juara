import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Account, processAccount, ProcessedAccount } from 'src/app/_data/model/account';
import { AccountPostDao, AccountPutDao } from 'src/app/_data/dao/account-dao';
import { AccountService } from 'src/app/_data/repository/account/account.service';
import { NewAccountDialogComponent } from './dialog/new-account-dialog/new-account-dialog.component';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nik', 'name', 'role', 'phone', 'whatsapp'];
  dataSource = new MatTableDataSource(Array<ProcessedAccount>());

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.accountService.get().then((rawData: Array<Account>) => {
      let dataProcessed: Array<ProcessedAccount> = []
      rawData.map((account) => {
        dataProcessed.push(processAccount(account))
      })
      this.dataSource = new MatTableDataSource(dataProcessed);
      console.log(rawData);
    })
      .catch(err => {
        console.error(err)
      })
  }

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  newAccountDialog() {
    let d: AccountPostDao = {
      nik: '',
      email: '',
      name: '',
      gender: '',
      phone:'', 
      whatsapp: '', 
      role: 2, 
      password: ''
    };
    const dialogRef = this.dialog.open(NewAccountDialogComponent, {
      width: '400px',
      data: d
    })
    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed:');
      console.log(data);
    })
  }

}

