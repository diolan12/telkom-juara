import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerPostDao, CustomerPutDao } from '../../dao/customer-dao';
import { Customer } from '../../model/customer';


// injectable customer service with get, create, update, delete method
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  // function to get all customer returning promise of customer array
  // require parameter of nullable id
  get(id: number | null = null): Promise<Array<Customer>> {
    return new Promise<Array<Customer>>((resolve, reject) => {
      // blank url then decide whether id is null or not
      // if id is null then get all customer
      // else get customer by id
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

  // function to create new customer by parameter of customer method POST dao returning promise of customer
  // require parameter of customer POST dao
  create(customerPostDao: CustomerPostDao): Promise<Customer> {
    return new Promise<Customer>((resolve, reject) => {
      this.http.post<Customer>(environment.apiUrl+'/api/customer', customerPostDao).toPromise()
      .then(response => {
        resolve(response)
      })
      .catch(err => { reject(err) })
    })
  }

  // function to update customer by parameter of customer method PUT dao returning promise of customer
  // require parameters of customer id and customer PUT dao
  update(id: number, customerPutDao: CustomerPutDao): Promise<Customer> {
    return new Promise<Customer>((resolve, reject) => {
      this.http.put<Customer>(environment.apiUrl+'/api/customer/' + id, customerPutDao).toPromise()
      .then(response => {
        resolve(response)
      })
      .catch(err => { reject(err) })
    })
  }

  
}
