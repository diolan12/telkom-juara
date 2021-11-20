import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/_data/model/order';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit, AfterViewInit {

  status: string | null = null;
  orderControl: FormGroup;
  panelOpenState = [false, false, false];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<Order>([{
    id: 1,
    uid: 'SC-2021102000001',
    field: null,
    office: 1,
    status: 'ongoing',
    customer: 1,
    service_type: 1
  }]);

  constructor(
    private formBuilder: FormBuilder) {
    this.orderControl = this.formBuilder.group({
      options: ['null']
    })
  }
  // @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  newOrderDialog() {
    console.log('new order dialog');
  }
}
