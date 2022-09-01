import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/_data/model/account';
import { Order, OrderDTO } from 'src/app/_data/model/order';
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

  filter: any = null

  dataSource = new MatTableDataSource<Order>();

  constructor(
    private authService: AuthService,
    public orderService: OrderService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService
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
    this.getOrder(con);
  }

  async getOrder(control: string | null) {
    let field = null
    if (this.user?.role === 2) {
      // field = this.user.id
    }
    await this.orderService.get<Array<Order>>(null, control, field).then((orders: Array<Order>) => {
      let tempOrders: Order[] = [];
      orders.forEach((order: Order)=>{
        if (order.service != null) {
          tempOrders.push(order)
        }
      })
      this.dataSource.data = tempOrders;
    }).catch((error) => {
      this.toastr.error(error.message, 'Error memuat data order');
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
      let con = (this.orderFilter.value.options == 'all') ? null : this.orderFilter.value.options
      this.getOrder(con);
    }).catch((error) => {
      this.toastr.error(error.message, 'Error membuat order');
    });
  }

}