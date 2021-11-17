import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  get(id: number | null = null): Promise<Array<Customer>> {
    return new Promise<Array<Customer>>((resolve, reject) => {
      let url = ''
      if (id === null) {
        url = environment.apiUrl+'/api/customer'
      } else {
        url = environment.apiUrl+'/api/customer/' + id
      }
      this.http.get<Array<Customer>>(url).toPromise()
      .then(response => {
        resolve(response)
      })
      .catch(err => { reject(err) })
    })
  }
}
