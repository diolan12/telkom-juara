import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Order } from 'src/app/_data/model/order';
import { OrderService } from 'src/app/_data/repository/order/order.service';
import { DatetimeService } from 'src/app/_data/service/datetime/datetime.service';

@Component({
  selector: 'app-order-weekly',
  templateUrl: './order-weekly.component.html',
  styleUrls: ['./order-weekly.component.css']
})
export class OrderWeeklyComponent implements AfterViewInit {

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
        type: 'shadow',
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
        type: 'value',
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
    private datetimeService: DatetimeService,
    private orderService: OrderService
  ) {
    this.today = new Date()
    this.startOfTheWeek = this.datetimeService.getMonday(this.today).getDate()
  }
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    this.initWeeklyCharts()
  }

  async initWeeklyCharts() {
    await this.orderService.get<Array<Order>>().then((orders: Order[]) => {
      orders.forEach((order: Order) => {
        let local = this.datetimeService.UTCStringtoLocal(order.created_at)
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
