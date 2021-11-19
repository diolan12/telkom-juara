import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Service, ServiceDao } from 'src/app/_data/model/service';
import { ServiceType } from 'src/app/_data/model/service-type';
import { ServiceTypeService } from 'src/app/_data/repository/service-type/service-type.service';
import { ServiceService } from 'src/app/_data/repository/service/service.service';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css']
})
export class ServiceDialogComponent {


  // Service form group
  serviceFormGroup: FormGroup;

  types: Array<ServiceType> = [];

  constructor(
    private serviceService: ServiceService,
    private serviceTypeService: ServiceTypeService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceDialogData,
    private formBuilder: FormBuilder
  ) {
    console.log(data);
    this.types = data.serviceTypes;
    if (data.service == null) {
      this.serviceFormGroup = this.formBuilder.group(ServiceDao.postValidator)
    } else {
      this.serviceFormGroup = this.formBuilder.group(ServiceDao.putValidator(data.service))
    }
  }

  create(): void {
    if (this.serviceFormGroup.invalid) {
      this.toastr.error('Input tidak valid', 'Error membuat jenis layanan baru');
    } else {
      this.serviceService.create(this.serviceFormGroup.value).then(response => {
        this.toastr.success('Layanan ' + response.name + ' ditambahkan', 'Sukses membuat layanan');
        this.dialogRef.close(response);
      }).catch(error => {
        this.toastr.error(error.message, 'Error membuat layanan baru');
      })
    }
  }

  update(): void {
    if (this.serviceFormGroup.invalid) {
      this.toastr.error('Input tidak valid', 'Error memperbarui layanan');
    } else {
      this.serviceService.update(this.data.service!!.id, this.serviceFormGroup.value).then(response => {
        this.toastr.success('Layanan ' + response.name + ' diperbarui', 'Sukses memperbarui layanan');
        this.dialogRef.close(response);
      }).catch(error => {
        this.toastr.error(error.message, 'Error memperbarui layanan');
      })
    }
  }

  delete(): void {
    this.serviceService.delete(this.data.service!!.id).then(reponse => {
      this.toastr.success("Layanan" + this.data.service!!.name + " dihapus", 'Sukses menghapus layanan');
      this.dialogRef.close();
    }).catch(error => {
      this.toastr.error(error.message, 'Error menghapus layanan');
    })
  }
}

export interface ServiceDialogData {
  serviceTypes: Array<ServiceType>;
  service: Service | null;
}