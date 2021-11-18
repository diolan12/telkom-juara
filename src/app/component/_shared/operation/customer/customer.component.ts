import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/_data/model/customer';
import { CustomerService } from 'src/app/_data/repository/customer/customer.service';

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
  @ViewChild(MatSort, {static: false}) sort: MatSort = new MatSort();

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog
  ) { }
  ngAfterViewInit(): void {
    this.getCustomers();
  }

  ngOnInit(): void {
  }

  // async await get all customers from server, then set data source and sort
  async getCustomers() {
    await this.customerService.get().then((customers: Array<Customer>) => {
      this.dataSource = new MatTableDataSource(customers);
      this.dataSource.sort = this.sort;
    })
    .catch(error => {})
  }

  newCustomerDialog() {
    console.log('New Customer Dialog');
  }
  editCustomerDialog(customer: Customer) {
    console.log(customer);
  }
}
