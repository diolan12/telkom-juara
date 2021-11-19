import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service, ServiceDao } from '../../model/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  // function to get all Service returning promise of Service array
  // require parameter of nullable id
  get(id: number | null = null): Promise<Array<Service>> {
    return new Promise<Array<Service>>((resolve, reject) => {
      // blank url then decide whether id is null or not
      // if id is null then get all services
      // else get service by id
      let url = '';
      if (id === null) {
        url = environment.apiUrl + '/api/service?clean';
      } else {
        url = environment.apiUrl + '/api/service/' + id;
      }
      this.http.get<Array<Service>>(url).toPromise()
      .then(response => {
        resolve(response)
      })
      .catch(err => { reject(err) })
    });
  }

  // function to create new Service by parameter of ServiceDao, returning promise of Service
  // require parameter of ServiceDao
  create(serviceDao: ServiceDao): Promise<Service> {
    return new Promise<Service>((resolve, reject) => {
      this.http.post<Service>(environment.apiUrl + '/api/service', serviceDao).toPromise()
      .then(response => {
        resolve(response)
      })
      .catch(err => { reject(err) })
    });
  }

  // function to update Service by parameter of Service id and ServiceDao, returning promise of Service
  // require parameters of Service id and ServiceDao
  update(id: number, serviceDao: ServiceDao): Promise<Service> {
    return new Promise<Service>((resolve, reject) => {
      this.http.put<Service>(environment.apiUrl + '/api/service/' + id, serviceDao).toPromise()
      .then(response => {
        resolve(response)
      })
      .catch(err => { reject(err) })
    });
  }

  // function to delete Service by parameter of Service id, returning promise of Service array
  // require parameter of Service id
  delete(id: number): Promise<Array<Service>> {
    return new Promise<Array<Service>>((resolve, reject) => {
      this.http.delete<Array<Service>>(environment.apiUrl + '/api/service/' + id).toPromise()
      .then(response => {
        resolve(response)
      })
      .catch(err => { reject(err) })
    });
  }

}
