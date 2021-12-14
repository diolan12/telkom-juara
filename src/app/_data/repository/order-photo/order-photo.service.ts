import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderPhoto, OrderPhotoDTO } from '../../model/order-photo';

@Injectable({
  providedIn: 'root'
})
export class OrderPhotoService {

  constructor(
    private http: HttpClient) { }

  create(orderPhotoDTO: OrderPhotoDTO): Promise<OrderPhoto> {
    return new Promise<OrderPhoto>((resolve, reject) => {
      this.http.post<OrderPhoto>(environment.apiUrl + '/api/order-photo', orderPhotoDTO).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }
  update(id: number, orderPhotoDTO: OrderPhotoDTO): Promise<OrderPhoto> {
    return new Promise<OrderPhoto>((resolve, reject) => {
      this.http.put<OrderPhoto>(environment.apiUrl + '/api/order-photo/' + id, orderPhotoDTO).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }
  upload(id: number, orderUID: string, order: OrderPhoto, file: any): Promise<OrderPhoto> {
    let url = environment.apiUrl + '/api/order-photo/' + id + '/upload/file?name=' + orderUID +'-'+ order.description + '&timestamp=updated_at';
    console.log(url);
    // Create form data
    let formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    return new Promise<OrderPhoto>((resolve, reject) => {
      this.http.post<OrderPhoto>(url, formData).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }
  // function to delete OrderPhoto by parameter of OrderPhoto id returning promise of OrderPhoto array
  // required parameters OrderPhoto id
  delete(id: number): Promise<Array<OrderPhoto>> {
    return new Promise<Array<OrderPhoto>>((resolve, reject) => {
      this.http.delete<Array<OrderPhoto>>(environment.apiUrl + '/api/order-photo/' + id).toPromise()
        .then(response => {
          resolve(response)
        })
        .catch(err => { reject(err) })
    })
  }
}
