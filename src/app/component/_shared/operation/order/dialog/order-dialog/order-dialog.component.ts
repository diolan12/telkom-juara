import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Account } from 'src/app/_data/model/account';
import { Customer } from 'src/app/_data/model/customer';
import { Order } from 'src/app/_data/model/order';
import { Service } from 'src/app/_data/model/service';
import { CustomerService } from 'src/app/_data/repository/customer/customer.service';
import { ServiceService } from 'src/app/_data/repository/service/service.service';


import { map, startWith } from 'rxjs/operators'
import { AuthService } from 'src/app/_data/service/auth.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent {

  office: Account | null = null;

  status = 'pending'

  customers: Array<Customer> = [];
  customerFormControl = new FormControl('customer');
  filteredCustomers: Observable<Array<Customer>>;
  selectedCustomer: Customer | null = null;

  services: Array<Service> = [];
  serviceFormControl = new FormControl('service');
  filteredServices: Observable<Array<Service>>;
  selectedService: Service | null = null;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private serviceService: ServiceService,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {
    this.authService.account().then((account) => {
      this.office = account;
    })
    this.init();
    this.filteredCustomers = this.customerFormControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCustomer(name) : this.customers.slice())
    );
    this.customerFormControl.valueChanges.subscribe(value => {
      console.log(typeof value);
      if (typeof value === 'object') {
        this.selectedCustomer = value as Customer
        console.log(this.selectedCustomer);
      }
    })

    this.filteredServices = this.serviceFormControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterService(name) : this.services.slice())
    );
    this.serviceFormControl.valueChanges.subscribe(val => {
      console.log(typeof val);
      if (typeof val === 'object') {
        this.selectedService = val as Service
        console.log(this.selectedService);
      }
    })
  }
  private _filterCustomer(name: string): Customer[] {
    const filterValue = name.toLowerCase();
    return this.customers.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  private _filterService(name: string): Service[] {
    const filterValue = name.toLowerCase();
    return this.services.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  async init() {
    await this.getCustomer();
    await this.getService();
  }

  async getCustomer() {
    await this.customerService.get().then((customers) => {
      this.customers = customers;
    });
  }
  displayCustomer(customer: Customer): string {
    return customer && customer.name ? customer.name : '';
  }

  async getService() {
    await this.serviceService.get().then((service) => {
      this.services = service;
    });
  }
  displayService(service: Service): string {
    return service && service.name ? service.name : '';
  }

  dismiss() {
    let data;
    if (this.selectedCustomer == null || this.selectedService == null) {
      data = null
    } else {
      data = {
        field: null,
        office: this.office?.id,
        status: this.status,
        customer: this.selectedCustomer?.id,
        service: this.selectedService?.id,
      }
    }
    this.dialogRef.close(data);
  }

}
