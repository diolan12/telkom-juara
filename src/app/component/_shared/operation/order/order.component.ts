import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/_data/model/account';
import { Customer } from 'src/app/_data/model/customer';
import { Order, OrderDTO } from 'src/app/_data/model/order';
import { Service } from 'src/app/_data/model/service';
import { AccountService } from 'src/app/_data/repository/account/account.service';
import { CustomerService } from 'src/app/_data/repository/customer/customer.service';
import { OrderService } from 'src/app/_data/repository/order/order.service';
import { ServiceService } from 'src/app/_data/repository/service/service.service';
import { AuthService } from 'src/app/_data/service/auth.service';
import { environment } from 'src/environments/environment';
import { CustomerDialogComponent } from '../customer/dialog/customer-dialog/customer-dialog.component';
import { OrderDialogComponent } from './dialog/order-dialog/order-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit, AfterViewInit {

  status: string | null = null;
  orderControl: FormGroup;

  user: Account | null = null;

  customers: Customer[] = [];
  accounts: Account[] = [];
  services: Service[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<DisplayOrder>();
  tempData: Array<Order> = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private accountService: AccountService,
    private serviceService: ServiceService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) {
    this.authService.account().then((account: Account) => {
      this.user = account;
    })
    this.orderControl = this.formBuilder.group({
      options: ['all']
    })
    this.orderControl.valueChanges.toPromise().then((data) => {
      console.log(data);
    })
    this.orderControl.valueChanges.subscribe((data) => {
      this.init();
    })
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.init();
  }
  async init() {
    let con = (this.orderControl.value.options == 'all') ? null : this.orderControl.value.options
    await this.getAccounts();
    await this.getCustomers();
    await this.getServices();
    await this.getOrder(con);
    this.build()
  }
  async getAccounts() {
    await this.accountService.get().then((accounts: Array<Account>) => {
      this.accounts = accounts;
    }).catch((error) => {

    })
  }
  async getCustomers() {
    await this.customerService.get().then((customers: Array<Customer>) => {
      this.customers = customers;
    }).catch((error) => {

    })
  }
  async getServices() {
    await this.serviceService.get().then((services: Array<Service>) => {
      this.services = services;
    }).catch((error) => {

    })
  }
  async getOrder(control: string | null) {
    await this.orderService.get(null, control).then((orders: Array<Order>) => {
      this.tempData = orders;
    }).catch((error) => {

    })
  }

  newOrderDialog() {
    const newDialogRef = this.dialog.open(OrderDialogComponent, {
      width: environment.modalWidth
    });
    newDialogRef.afterClosed().subscribe((data) => {
      if (data !== null) {
        if (data !== '') {
          if (data !== undefined) {
            console.log('create new order');
            console.log(data);
            this.createOrder(data);
          }
        }
      }
      this.init();
    });
  }

  createOrder(orderDto: OrderDTO) {
    this.orderService.create(orderDto).then((response) => {
      this.toastr.success('Order terdaftar', 'Sukses membuat order');
    }).catch((error) => {
      this.toastr.error(error.message, 'Error membuat order');
    });
  }

  build() {
    this.dataSource.data = this.tempData.map((order: Order): DisplayOrder => {
      return {
        id: order.id,
        uid: order.uid,
        field: this.getAccount(order.field),
        office: this.getAccount(order.office),
        customer: this.getCustomer(order.customer),
        status: order.status,
        service: this.getService(order.service),
      }
    });
    console.log(this.dataSource.data);
  }

  getAccount(id: number | null): Account | null {
    if (id === null) {
      return null;
    }
    let _account: Account | null = null;
    this.accounts.forEach((account: Account) => {
      if (account.id === id) {
        _account = account;
      }
    })
    return _account!;
  }

  getCustomer(id: number): Customer | null {
    let _customer: Customer | null = null;
    this.customers.forEach((customer: Customer) => {
      if (customer.id === id) {
        _customer = customer;
      }
    })
    return _customer!;
  }
  getService(id: number): Service | null {
    let _service: Service | null = null;
    this.services.forEach((service: Service) => {
      if (service.id === id) {
        _service = service;
      }
    })
    return _service!;
  }

  getStatusDisplay(status: string) {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'ongoing': return 'Sedang Dikerjakan';
      case 'completed': return 'Selesai';
      default: return '';
    }
  }

  toOngoing(status: string, order: DisplayOrder) {
    // field: number | null;
    // office: number;
    // status: string;
    // customer: number;
    // service: number;
    let o: OrderDTO = {
      field: (this.user?.id === undefined) ? null : this.user.id,
      office: order.office!.id,
      status: status,
      customer: order.customer!.id,
      service: order.service!.id,
    }
    this.orderService.update(order.id, o).then((response) => {

    }).catch((error) => {

    }).finally(() => {
      this.init();
    })
  }
}

interface DisplayOrder {
  id: number;
  uid: string;
  field: Account | null;
  office: Account | null;
  customer: Customer | null;
  status: string;
  service: Service | null;
}