import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order, OrderDTO } from '../../model/order';
import { OrderPhoto, OrderPhotoDTO } from '../../model/order-photo';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient) { }

  // function to get all orders return type promise of order array
  // require parameters of nullable id and string status
  get<T>(uid: string | null = null, status: string | null = null, field: number | null = null): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // blank url then decide whether id is null or not
      // if id is null then get all account
      // else get account by id
      let url = '';
      if (uid === null) {
        if (status !== null) {
          url = environment.apiUrl + '/api/order?relation&clean&where=status.is.' + status + '&orderBy=updated_at-desc';
        } else {
          url = environment.apiUrl + '/api/order?relation&clean';
        }
        if (field !== null) {
          url += '&where=field.is.' + field;
        }
      } else {
        url = environment.apiUrl + '/api/order?relation&where=uid.is.' + uid;
      }
      this.http.get<T>(url).toPromise()
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
      this.http.put<Order>(environment.apiUrl + '/api/order/' + id, orderDto).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }

  upload(id: number, col: string, order: Order, file: any): Promise<Order> {
    let url = environment.apiUrl + '/api/order/' + id + '/upload/' + col + '?name=' + order.uid +'-'+ col + '&timestamp=' + col + '_taken_at';
    console.log(url);
    // Create form data
    let formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    return new Promise<Order>((resolve, reject) => {
      this.http.post<Order>(url, formData).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }

  getStatusDisplay(status: string) {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'ongoing': return 'Sedang Dikerjakan';
      case 'trouble': return 'Terkendala';
      case 'completed': return 'Selesai';
      case 'archived': return 'Diarsipkan';
      default: return '';
    }
  }
}
