import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ServiceType, ServiceTypeDao } from 'src/app/_data/model/service-type';
import { ServiceTypeService } from 'src/app/_data/repository/service-type/service-type.service';

@Component({
  selector: 'app-service-type-dialog',
  templateUrl: './service-type-dialog.component.html',
  styleUrls: ['./service-type-dialog.component.css']
})
export class ServiceTypeDialogComponent {

  // ServiceType form group
  serviceTypeFormGroup: FormGroup;

  constructor(
    private serviceTypeService: ServiceTypeService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ServiceTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceType,
    private formBuilder: FormBuilder
  ) {
    if (data == null) {
      this.serviceTypeFormGroup = this.formBuilder.group(ServiceTypeDao.postValidator);
    } else {
      this.serviceTypeFormGroup = this.formBuilder.group(ServiceTypeDao.putValidator(data));
    }
  }

  create() {
    if (this.serviceTypeFormGroup.invalid) {
      this.toastr.error('Input tidak valid', 'Error membuat jenis layanan baru');
    } else {
      this.serviceTypeService.create(this.serviceTypeFormGroup.value).then(response => {
        this.toastr.success('Jenis layanan ' + response.name + ' ditambahkan', 'Sukses membuat jenis layanan');
        this.dialogRef.close(response);
      }).catch(error => {
        this.toastr.error(error.message, 'Error membuat jenis layanan baru');
      })
    }
  }
  
  update() {
    if (this.serviceTypeFormGroup.invalid) {
      this.toastr.error('Input tidak valid', 'Error memperbarui jenis layanan');
    } else {
      this.serviceTypeService.update(this.data.id, this.serviceTypeFormGroup.value).then(response => {
        this.toastr.success('Jenis layanan ' + response.name + ' diperbarui', 'Sukses memperbarui jenis layanan');
        this.dialogRef.close(response);
      }).catch(error => {
        this.toastr.error(error.message, 'Error memperbarui jenis layanan');
      })
    }
  }
  
  delete() {
    this.serviceTypeService.delete(this.data.id).then((response) => {
      this.toastr.success('Jenis layanan ' + this.data.name + ' dihapus', 'Sukses menghapus jenis layanan');
      this.dialogRef.close(response);
    }).catch(error => {
      this.toastr.error(error.message, 'Error menghapus jenis layanan');
    });
  }

}
