import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/example.environment';
import { Order, OrderDTO } from '../../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient) { }

  // function to get all orders return type promise of order array
  // require parameters of nullable id and string status
  get(id: number |null = null, status: string| null = null): Promise<Array<Order>> {
    return new Promise<Array<Order>>((resolve, reject) => {
      // blank url then decide whether id is null or not
      // if id is null then get all account
      // else get account by id
      let url = '';
      if (id === null) {
        if (status !== null) {
          url = environment.apiUrl + '/api/order?relation&clean&where=status-is-'+status;
        } else {
          url = environment.apiUrl + '/api/order?relation&clean';
        }
      } else {
        url = environment.apiUrl + '/api/order/'+id+'?relation';
      }
      this.http.get<Array<Order>>(url).toPromise()
      .then(response => {
        resolve(response)
      })
      .catch(err => { reject(err) })
    })
  }

  create(orderDto: OrderDTO): Promise<Order> {
    return new Promise<Order>((resolve, reject) => {
      this.http.post<Order>(environment.apiUrl + '/api/order', orderDto).toPromise()
      .then(response => {
        resolve(response)
      })
      .catch(err => { reject(err) })
    })
  }

  update(id: number, orderDto: OrderDTO): Promise<Order> {
    return new Promise<Order>((resolve, reject) => {
      this.http.put<Order>(environment.apiUrl + '/api/order/'+id, orderDto).toPromise()
      .then(response => {
        resolve(response)
      })
      .catch(err => { reject(err) })
    })
  }

}
