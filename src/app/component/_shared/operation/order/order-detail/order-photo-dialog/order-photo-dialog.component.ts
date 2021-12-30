import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderPhoto, OrderPhotoDTO } from 'src/app/_data/model/order-photo';
import { OrderPhotoService } from 'src/app/_data/repository/order-photo/order-photo.service';

@Component({
  selector: 'app-order-photo-dialog',
  templateUrl: './order-photo-dialog.component.html',
  styleUrls: ['./order-photo-dialog.component.css']
})
export class OrderPhotoDialogComponent implements OnInit {

  orderUniqueID: string = '';
  orderPhotoFormGroup: FormGroup;

  constructor(
    private router: Router,
    private orderPhotoService: OrderPhotoService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<OrderPhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderPhoto,
    private formBuilder: FormBuilder
    ) { 
      if (data.description == null) {
        this.orderPhotoFormGroup = this.formBuilder.group(OrderPhotoDTO.postValidator(data))
      } else {
        this.orderPhotoFormGroup = this.formBuilder.group(OrderPhotoDTO.putValidator(data))
      }
    }

  ngOnInit(): void {
    this.orderUniqueID = this.router.url.split('/')[4]
  }
  create() {
    if (this.orderPhotoFormGroup.invalid) {
      this.toastr.error('Invalid form', 'Error');
    } else {
      this.orderPhotoService.create(this.orderPhotoFormGroup.value).then(response => {
        this.toastr.success('Documentation created', 'Success');
        this.dialogRef.close(response);
      }).catch(error => {
        this.toastr.error(error.message, 'Error');
      });
    }
  }
  update() {
    if (this.orderPhotoFormGroup.invalid) {
      this.toastr.error('Invalid form', 'Error');
    } else {
      this.orderPhotoService.update(this.data.id, this.orderPhotoFormGroup.value).then(response => {
        this.toastr.success('Dokumentasi diperbarui', 'Success');
        this.dialogRef.close(response);
      }).catch(error => {
        this.toastr.error(error.message, 'Error memperbarui dokumentasi');
      });
    }
  }
  delete() {
    this.orderPhotoService.delete(this.data.id).then(response => {
      this.toastr.success('Dokumentasi dihapus', 'Success');
      this.dialogRef.close(response);
    }).catch(error => {
      this.toastr.error(error.message, 'Error');
    });
  }
  uploadDoc(orderPhoto: OrderPhoto, event: any) {
    console.log('uploadDoc');
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    this.orderPhotoService.upload(orderPhoto.id, this.orderUniqueID, orderPhoto, event.target.files[0]).then((response) => {
      console.log(response);
      this.toastr.success('Dokumentasi diperbarui', 'Berhasil mengupload foto');
    }).catch((error) => {
      console.error(error);
      this.toastr.error(error.message, 'Error mengupload foto');
    }).finally(() => {
      this.dialogRef.close();
    })
  }

}
