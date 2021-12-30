import { AfterViewInit, Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Account } from 'src/app/_data/model/account';
import { Order } from 'src/app/_data/model/order';
import { OrderService } from 'src/app/_data/repository/order/order.service';
import { AuthService } from 'src/app/_data/service/auth.service';
import { DatetimeService } from 'src/app/_data/service/datetime/datetime.service';

@Component({
  selector: 'app-order-monthly',
  templateUrl: './order-monthly.component.html',
  styleUrls: ['./order-monthly.component.css']
})
export class OrderMonthlyComponent implements AfterViewInit {

  account: Account | null = null;
  today: Date;
  isLoading = true

  daysThisMonth: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  monthlyStats: Array<number> = [0, 0, 0, 0, 0, 0]

  updateMonthly: any
  monthlyChart: EChartsOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: [
      {
        type: 'category',
        data: this.daysThisMonth,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: {},
    series: [
      {
        name: 'Order per hari',
        type: 'line',
        stack: 'x',
        data: this.monthlyStats,
        smooth: true
      },
    ],
  };

  constructor(
    private authService: AuthService,
    public datetimeService: DatetimeService,
    private orderService: OrderService
  ) {
    this.today = new Date();
    this.authService.account().then((account: Account) => {
      this.account = account
    })
  }
  ngAfterViewInit(): void {
    if (this.account !== null) {
      this.initMonthlyCharts()
    }
    // this.initMonthlyCharts()
  }

  async initMonthlyCharts() {
    let howManyDateThisMonth = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0).getDate()
    this.daysThisMonth = new Array<number>(howManyDateThisMonth).fill(0).map((_x, i) => i + 1)
    this.monthlyStats = new Array<number>(howManyDateThisMonth).fill(0).map((_x, _i) => 0)
    let field: number | null = null
    if (this.account?.role === 2) {
      field = this.account.id
    }
    await this.orderService.get<Array<Order>>(null, null, field).then((orders: Order[]) => {
      orders.forEach((order: Order) => {
        let local = this.datetimeService.UTCStringtoLocal(order.created_at)
        if (this.today.getMonth() === local.getMonth() && this.today.getFullYear() === local.getFullYear()) {
          this.monthlyStats[local.getDate()-1] += 1
        }
      })
      this.updateMonthly = {
        xAxis: [
          {
            data: this.daysThisMonth
          }
        ],
        series: [{
          data: this.monthlyStats
        }]
      };
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      this.isLoading = false

    })
  }
}
