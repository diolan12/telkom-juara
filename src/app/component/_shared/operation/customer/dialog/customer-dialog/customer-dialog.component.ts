import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomerDao } from 'src/app/_data/dao/customer-dao';
import { Customer } from 'src/app/_data/model/customer';
import { CustomerService } from 'src/app/_data/repository/customer/customer.service';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent {

  // customer form group
  customerFormGroup: FormGroup;

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private formBuilder: FormBuilder
  ) {
    if (data == null) {
      this.customerFormGroup = this.formBuilder.group(CustomerDao.postValidator);
    } else {
      this.customerFormGroup = this.formBuilder.group(CustomerDao.putValidator(data));
    }
  }

  create() {
    console.log(this.customerFormGroup.value);
    if (this.customerFormGroup.invalid) {
      this.toastr.error('Input tidak valid', 'Error mendaftarkan pelanggan');
    } else {
      this.customerService.create(this.customerFormGroup.value).then(response => {
        this.toastr.success('Pelanggan ' + response.name + ' terdaftar', 'Sukses mendaftarkan pelanggan');
        this.dialogRef.close(response);
      }).catch(error => {
        this.toastr.error(error.message, 'Error mendaftarkan pelanggan');
      });
    }
  }

  update() {
    console.log(this.customerFormGroup.value);
    if (this.customerFormGroup.invalid) {
      this.toastr.error('Input tidak valid', 'Error memperbarui pelanggan');
    } else {
      this.customerService.update(this.data.id, this.customerFormGroup.value).then(response => {
        this.toastr.success('Pelanggan ' + response.name + ' diperbarui', 'Sukses memperbarui pelanggan');
        this.dialogRef.close(response);
      }).catch(error => {
        this.toastr.error(error.message, 'Error memperbarui pelanggan');
      });
    }
  }

  delete() {
    this.customerService.delete(this.data.id).then(response => {
      this.toastr.success('Pelanggan ' + this.data.name + ' dihapus', 'Sukses menghapus pelanggan');
      this.dialogRef.close(response);
    }).catch(error => {
      this.toastr.error(error.message, 'Error menghapus pelanggan');
    });

  }

}
