import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceType, ServiceTypeDto } from '../../model/service-type';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  constructor(private http: HttpClient) { }

  // function to get all service-type returning promise of service-type array
  // require parameter of nullable id
  get(id: number | null = null): Promise<Array<ServiceType>> {
    return new Promise<Array<ServiceType>>((resolve, reject) =>{
      // blank url then decide whether id is null or not
      // if id is null then get all customer
      // else get customer by id
      let url = '';
      if (id == null) {
        url = environment.apiUrl + '/api/service-type?clean';
      } else {
        url = environment.apiUrl + '/api/service-type/' + id;
      }
      this.http.get<Array<ServiceType>>(url).toPromise()
      .then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  }

  // function to create new service-type by parameter of ServiceTypeDao returning promise of service-type
  // require parameter of ServiceTypeDao
  create(serviceTypeDao: ServiceTypeDto): Promise<ServiceType> {
    return new Promise<ServiceType>((resolve, reject) =>{
      this.http.post<ServiceType>(environment.apiUrl + '/api/service-type', serviceTypeDao).toPromise()
      .then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  }

  // function to update ServiceType by parameter of ServiceTypeDao returning promise of ServiceType
  // require parameters of ServiceType id and ServiceTypeDao
  update(id: number, serviceTypeDao: ServiceTypeDto): Promise<ServiceType> {
    return new Promise<ServiceType>((resolve, reject) =>{
      this.http.put<ServiceType>(environment.apiUrl + '/api/service-type/' + id, serviceTypeDao).toPromise()
      .then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  }

  // function to delete ServiceType by parameter of ServiceType id returning promise of ServiceType array
  // require parameter of ServiceType id
  delete(id: number): Promise<Array<ServiceType>> {
    return new Promise<Array<ServiceType>>((resolve, reject) =>{
      this.http.delete<Array<ServiceType>>(environment.apiUrl + '/api/service-type/' + id).toPromise()
      .then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  }

}
