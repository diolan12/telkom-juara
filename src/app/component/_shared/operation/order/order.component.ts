import { HttpClient } from '@angular/common/http';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Account } from 'src/app/_data/model/account';
import { Customer } from 'src/app/_data/model/customer';
import { Order, OrderDTO } from 'src/app/_data/model/order';
import { Service } from 'src/app/_data/model/service';
import { OrderService } from 'src/app/_data/repository/order/order.service';
import { AuthService } from 'src/app/_data/service/auth.service';
import { environment } from 'src/environments/environment';
import { OrderDialogComponent } from './dialog/order-dialog/order-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit, AfterViewInit {

  status: string | null = null;
  orderFilter: FormGroup;

  user: Account | null = null;

  // customers: Customer[] = [];
  // accounts: Account[] = [];
  // services: Service[] = [];

  dataSource = new MatTableDataSource<Order>();
  // tempData: Array<Order> = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.authService.account().then((account: Account) => {
      this.user = account;
    })
    this.orderFilter = this.formBuilder.group({
      options: ['pending']
    })
    this.orderFilter.valueChanges.toPromise().then((data) => {
      console.log(data);
    })
    this.orderFilter.valueChanges.subscribe((data) => {
      this.init();
    })
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    let con = (this.orderFilter.value.options == 'all') ? null : this.orderFilter.value.options
    await this.getOrder(con);
  }

  async getOrder(control: string | null) {
    await this.orderService.get<Array<Order>>(null, control).then((orders: Array<Order>) => {
      this.dataSource.data = orders;
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

  getStatusDisplay(status: string) {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'ongoing': return 'Sedang Dikerjakan';
      case 'trouble': return 'Terkendala';
      case 'completed': return 'Selesai';
      case 'archived': return 'Diarsipkan';
      default: return '';
    }
  }

  // setStatus(status: string, order: Order) {
  //   let o: OrderDTO = {
  //     field: (this.user?.id === undefined) ? null : this.user.id,
  //     office: order.office.id,
  //     status: status,
  //     customer: order.customer.id,
  //     service: order.service.id,
  //   }
  //   this.orderService.update(order.id, o).then((response) => {

  //   }).catch((error) => {

  //   }).finally(() => {
  //     this.init();
  //   })
  // }
}