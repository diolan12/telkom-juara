import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Order } from 'src/app/_data/model/order';
import { OrderService } from 'src/app/_data/repository/order/order.service';
import { DatetimeService } from 'src/app/_data/service/datetime/datetime.service';

@Component({
  selector: 'app-order-yearly',
  templateUrl: './order-yearly.component.html',
  styleUrls: ['./order-yearly.component.css']
})
export class OrderYearlyComponent implements AfterViewInit {

  today: Date;
  isLoading = true

  yearlyStats: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  
  updateYearly: any
  async initYearlyCharts() {
    await this.orderService.get<Array<Order>>().then((orders: Order[]) => {
      orders.forEach((order: Order) => {
        let local = this.datetimeService.UTCStringtoLocal(order.created_at)
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
    private datetimeService: DatetimeService,
    private orderService: OrderService
  ) {
    this.today = new Date();
  }
  ngAfterViewInit(): void {
    this.isLoading = true
    this.initYearlyCharts()
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
      },
    ],
    yAxis: [
      {
        type: 'value',
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
