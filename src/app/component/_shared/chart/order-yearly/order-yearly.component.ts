import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Account } from 'src/app/_data/model/account';
import { Order } from 'src/app/_data/model/order';
import { OrderService } from 'src/app/_data/repository/order/order.service';
import { AuthService } from 'src/app/_data/service/auth.service';
import { DatetimeService } from 'src/app/_data/service/datetime/datetime.service';

@Component({
  selector: 'app-order-yearly',
  templateUrl: './order-yearly.component.html',
  styleUrls: ['./order-yearly.component.css']
})
export class OrderYearlyComponent implements AfterViewInit {

  account: Account | null = null;
  today: Date;
  isLoading = true

  yearlyStats: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  
  updateYearly: any
  async initYearlyCharts() {
    let field: number | null = null
    if (this.account?.role === 2) {
      field = this.account.id
    }
    await this.orderService.get<Array<Order>>(null, null, field).then((orders: Order[]) => {
      orders.forEach((order: Order) => {
        let local = this.datetimeService.parse(order.created_at)
        if (local.getFullYear() === this.today.getFullYear()) {
          this.yearlyStats[local.getMonth()] += 1
        }
      })
      this.updateYearly = {
        series: [{
          data: this.yearlyStats
        }]
      };
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      this.isLoading = false
    })
  }
  constructor(
    private authService: AuthService,
    private datetimeService: DatetimeService,
    private orderService: OrderService
  ) {
    this.today = new Date();
    this.authService.account().then((account: Account) => {
      this.account = account
    })
  }
  ngAfterViewInit(): void {
    this.isLoading = true
    if (this.account !== null) {
      this.initYearlyCharts()
    }
  }

  yearlyChart: EChartsOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          rotate: 45
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
        name: 'Total order per bulan',
        type: 'bar',
        barWidth: '60%',
        data: this.yearlyStats,
      },
    ],
  };

}
