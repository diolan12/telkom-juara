import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/_data/model/customer';
import { CustomerService } from 'src/app/_data/repository/customer/customer.service';
import { environment } from 'src/environments/environment';
import { CustomerDialogComponent } from './dialog/customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements AfterViewInit {
  // string array for table headers
  displayedColumns: string[] = ['no_indihome', 'no_telephone', 'name'];

  // blank mat-table data source
  dataSource = new MatTableDataSource(Array<Customer>());


  // non-static material table sort initialization
  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort();

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog
  ) { }
  ngAfterViewInit(): void {
    this.getCustomers();
  }

  // async await get all customers from server, then set data source and sort
  async getCustomers() {
    await this.customerService.get().then((customers: Array<Customer>) => {
      this.dataSource.data = customers;
      this.dataSource.sort = this.sort;
    })
      .catch(() => { })
  }

  newCustomerDialog() {
    const newDialogRef = this.dialog.open(CustomerDialogComponent, {
      width: environment.modalWidth
    });
    newDialogRef.afterClosed().subscribe(() => {
      this.getCustomers();
    });
  }

  editCustomerDialog(customer: Customer) {
    const editDialogRef = this.dialog.open(CustomerDialogComponent, {
      width: environment.modalWidth,
      data: customer
    });
    editDialogRef.afterClosed().subscribe(() => {
      this.getCustomers();
    });
  }
}

