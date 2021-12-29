import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import * as echarts from 'echarts/types/dist/echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { Order } from 'src/app/_data/model/order';
import { OrderService } from 'src/app/_data/repository/order/order.service';
import { DatetimeService } from 'src/app/_data/service/datetime/datetime.service';
// require('highcharts/themes/dark-blue')(Highcharts);

@Component({
  selector: 'app-shared-home',
  templateUrl: './shared-home.component.html',
  styleUrls: ['./shared-home.component.css']
})
export class SharedHomeComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
