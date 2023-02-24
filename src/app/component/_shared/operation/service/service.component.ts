import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTable as MatTable, MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Service } from 'src/app/_data/model/service';
import { ServiceType } from 'src/app/_data/model/service-type';
import { ServiceTypeService } from 'src/app/_data/repository/service-type/service-type.service';
import { ServiceService } from 'src/app/_data/repository/service/service.service';
import { environment } from 'src/environments/environment';
import { ServiceDialogComponent } from './dialog/service-dialog/service-dialog.component';
import { ServiceTypeDialogComponent } from './dialog/service-type-dialog/service-type-dialog.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements AfterViewInit {

  // string array for Service table headers
  serviceHeaders: string[] = ['type', 'name'];

  // string array for ServiceType table headers
  serviceTypeHeaders: string[] = ['name', 'id'];


  // blank mat-table Service data source
  serviceDataSource = new MatTableDataSource(Array<Service>());

  // blank mat-table ServiceType data source
  serviceTypeDataSource = new MatTableDataSource(Array<ServiceType>());


  // non-static material table sort initialization for Service
  @ViewChild(MatSort, { static: false }) serviceSort: MatSort = new MatSort();

  // non-static material table sort initialization for ServiceType
  @ViewChild(MatSort, { static: false }) serviceTypeSort: MatSort = new MatSort();

  constructor(
    private serviceService: ServiceService,
    private serviceTypeService: ServiceTypeService,
    public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.getServices();
    this.getServiceTypes();
  }

  displayServiceType(serviceTypeId: number): string {
    let serviceTypeName = ''
    this.serviceTypeDataSource.data.forEach(serviceType => {
      if (serviceType.id === serviceTypeId) {
        serviceTypeName = serviceType.name;
      }
    });
    return (serviceTypeName === '') ? 'jenis layanan dihapus' : serviceTypeName;
  }

  async getServices() {
    await this.serviceService.get().then((services: Array<Service>) => {
      this.serviceDataSource.data = services;
      this.serviceDataSource.sort = this.serviceSort;
    })
      .catch(() => { })
  }

  async getServiceTypes() {
    await this.serviceTypeService.get().then((serviceTypes: Array<ServiceType>) => {
      this.serviceTypeDataSource.data = serviceTypes;
      this.serviceTypeDataSource.sort = this.serviceTypeSort;
    })
      .catch(() => { })

  }


  newServiceDialog(): void {
    const serviceTypeDialogRef = this.dialog.open(ServiceDialogComponent, {
      width: environment.modalWidth,
      data: {
        serviceTypes:this.serviceTypeDataSource.data, 
        service: null
      }
    })
    serviceTypeDialogRef.afterClosed().subscribe(()=>{
      this.getServices();
    })
  }

  newServiceTypeDialog(): void {
    const serviceTypeDialogRef = this.dialog.open(ServiceTypeDialogComponent, {
      width: environment.modalWidth
    })
    serviceTypeDialogRef.afterClosed().subscribe(()=>{
      this.getServiceTypes();
    })
  }

  editServiceDialog(service: Service): void {
    const serviceTypeDialogRef = this.dialog.open(ServiceDialogComponent, {
      width: environment.modalWidth,
      data: {
        serviceTypes:this.serviceTypeDataSource.data, 
        service: service
      }
    })
    serviceTypeDialogRef.afterClosed().subscribe(()=>{
      this.getServices();
    })
  }

  editServiceTypeDialog(serviceType: ServiceType): void {
    const serviceTypeDialogRef = this.dialog.open(ServiceTypeDialogComponent, {
      width: environment.modalWidth,
      data: serviceType
    })
    serviceTypeDialogRef.afterClosed().subscribe(()=>{
      this.getServiceTypes();
    })
  }

  deleteService(serviceId: number): void {

  }

  deleteServiceType(serviceTypeId: number): void {

  }

}

