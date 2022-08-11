import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Account } from 'src/app/_data/model/account';
import { Order } from 'src/app/_data/model/order';
import { OrderService } from 'src/app/_data/repository/order/order.service';
import { AuthService } from 'src/app/_data/service/auth.service';
import { DatetimeService } from 'src/app/_data/service/datetime/datetime.service';

@Component({
  selector: 'app-order-weekly',
  templateUrl: './order-weekly.component.html',
  styleUrls: ['./order-weekly.component.css']
})
export class OrderWeeklyComponent implements AfterViewInit {

  account: Account | null = null;
  today: Date;
  isLoading = true

  startOfTheWeek: number
  weeklyStats: Array<number> = [0, 0, 0, 0, 0, 0, 0]

  daysThisWeek: Array<string> = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu', 'Minggu']

  updateWeekly: any

  weeklyChart: EChartsOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: [
      {
        type: 'category',
        data: this.daysThisWeek,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        name: 'Order masuk',
        type: 'value',
        minInterval: 0
      },
    ],
    series: [
      {
        name: 'Total order',
        type: 'line',
        stack: 'x',
        data: this.weeklyStats,
        smooth: true
      }
    ],
  };
  constructor(
    private authService: AuthService,
    private datetimeService: DatetimeService,
    private orderService: OrderService
  ) {
    this.authService.account().then((account: Account) => {
      this.account = account
    })
    this.today = new Date()
    this.startOfTheWeek = this.datetimeService.getMonday(this.today).getDate()
  }
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    if (this.account !== null) {
      this.initWeeklyCharts()
    }
  }

  async initWeeklyCharts() {
    let field: number | null = null
    if (this.account?.role === 2) {
      field = this.account.id
    }
    await this.orderService.get<Array<Order>>(null, null, field).then((orders: Order[]) => {
      orders.forEach((order: Order) => {
        let local = this.datetimeService.parse(order.created_at)
        if (this.today.getMonth() === local.getMonth() && this.today.getFullYear() === local.getFullYear()) {
          if (local.getDate() >= this.startOfTheWeek && local.getDate() <= this.startOfTheWeek + 6) {
            this.weeklyStats[local.getDate() - this.startOfTheWeek] += 1
          }
        }
      })
      this.updateWeekly = {
        xAxis: [
          {
            data: this.daysThisWeek
          }
        ],
        series: [{
          data: this.weeklyStats
        }]
      };
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      this.isLoading = false
    })
  }
  
}
