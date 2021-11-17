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
  displayedColumns: string[] = ['no_indihome', 'no_telephone', 'name'];
  dataSource = new MatTableDataSource(Array<Customer>());

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog
  ) { }
  ngAfterViewInit(): void {
    this.getCustomers();
  }

  @ViewChild(MatSort, {static: false}) sort: MatSort = new MatSort();
  ngOnInit(): void {
  }
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
