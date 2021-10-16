import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountPutDao, PasswordErrorStateMatcher } from 'src/app/_data/dao/account-dao';
import { Account } from 'src/app/_data/model/account';
import { Role } from 'src/app/_data/model/role';
import { AccountService } from 'src/app/_data/repository/account/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: './edit-account-dialog.component.html',
  styleUrls: ['./edit-account-dialog.component.css']
})
export class EditAccountDialogComponent {

  togglePassword = true;
  editAccountGroup: FormGroup;
  roles: Array<Role> = [
    { value: 0, text: 'Administrator' },
    { value: 1, text: 'Kantor' },
    { value: 2, text: 'Petugas Lapangan' }
  ];
  matcher = new PasswordErrorStateMatcher();

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account,
    private formBuilder: FormBuilder
  ) {
    this.editAccountGroup = this.formBuilder.group(AccountPutDao.validator(data), { validators: AccountPutDao.passwordMatcher })
  }
  getProfile(): string {
    return environment.apiUrl + '/assets/profile/' + this.data.photo
  }
  
  validate() {

    if (this.editAccountGroup.invalid) {
      this.toastr.error('Input tidak valid', 'Error memperbarui akun');
    } else {
      this.accountService.update(this.data.id, this.editAccountGroup.value).then(response => {
        this.toastr.success('Akun ' + response.name + ' berhasil diperbarui', 'Akun diperbarui');
        this.dialogRef.close(response)
      }).catch(error => {
        this.toastr.error(error.message, 'Error memperbarui akun');
      })
    }
  }
  onNoClick(): void {
    this.dialogRef.close()
  }

}
interface Generic {
  typesafeProp1?: number,
    // requiredProp1: string,
    [key: string]: any
}