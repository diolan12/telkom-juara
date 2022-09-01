import { AfterViewInit, Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Order } from 'src/app/_data/model/order';
import { OrderService } from 'src/app/_data/repository/order/order.service';
import { DatetimeService } from 'src/app/_data/service/datetime/datetime.service';

@Component({
  selector: 'app-order-service-yearly',
  templateUrl: './order-service-yearly.component.html',
  styleUrls: ['./order-service-yearly.component.css']
})
export class OrderServiceYearlyComponent implements AfterViewInit {

  today: Date;
  isLoading = true

  daysThisMonth: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  monthlyStats: Array<number> = [0, 0, 0, 0, 0, 0]

  updateYearlyPie: any
  yearlyPieChart: EChartsOption = {
    // title: {
    //   text: 'Trend Layanan Tahunan',
    //   subtext: 'Tahun',
    //   left: 'center'
    // },
    // legend: {},
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        label: {
          show: true
        },
        type: 'pie',
        radius: '50%'
      }
    ]
  };

  constructor(
    private datetimeService: DatetimeService,
    private orderService: OrderService
  ) {
    this.today = new Date();
    // this.updateYearlyPie = {
    //   title: {
    //     text: "Trend Layanan",
    //     subtext: 'Tahun '+this.today.getFullYear(),
    //   }
    // }
  }
  ngAfterViewInit(): void {
    this.initYearlyCharts()
  }

  async initYearlyCharts() {
    let howManyDateThisMonth = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0).getDate()
    this.daysThisMonth = new Array<number>(howManyDateThisMonth).fill(0).map((_x, i) => i + 1)
    this.monthlyStats = new Array<number>(howManyDateThisMonth).fill(0).map((_x, _i) => 0)
    await this.orderService.get<Array<Order>>().then((orders: Order[]) => {
      let services: string[] = []
      let count: number[] = []
      orders.forEach((order: Order) => {
        if (order.service != null) {
          let local = this.datetimeService.parse(order.created_at)
          if (this.today.getFullYear() === local.getFullYear()) {
            if (!services.includes(order.service.name)) {
              services.push(order.service.name)
              count.push(1)
            } else {
              count[services.indexOf(order.service.name)] += 1
            }
          }
        }
      })
      let data: { name: string; value: number; }[] = []
      services.forEach((service: string, index: number) => {
        data.push({
          name: service,
          value: count[index]
        })
      })
      this.updateYearlyPie = {
        series: [{
          data: data
        }]
      };
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      this.isLoading = false

    })
  }

}
