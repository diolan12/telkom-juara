import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountPostDao, PasswordErrorStateMatcher } from 'src/app/_data/dao/account-dao';
import { Role } from 'src/app/_data/model/role';
import { AccountService } from 'src/app/_data/repository/account/account.service';


@Component({
  selector: 'app-new-account-dialog',
  templateUrl: './new-account-dialog.component.html',
  styleUrls: ['./new-account-dialog.component.css']
})
export class NewAccountDialogComponent {

  togglePassword = true;
  newAccountGroup: FormGroup;
  roles: Array<Role> = [
    { value: 0, text: 'Administrator' },
    { value: 1, text: 'Kantor' },
    { value: 2, text: 'Petugas Lapangan' }
  ];
  matcher = new PasswordErrorStateMatcher();

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<NewAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountPostDao,
    private formBuilder: FormBuilder
  ) {
    this.newAccountGroup = this.formBuilder.group(AccountPostDao.validator, { validators: AccountPostDao.passwordMatcher })
  }

  create() {
    if (this.newAccountGroup.invalid) {
      this.toastr.error('Input tidak valid', 'Error membuat akun');
    } else {
      this.accountService.new(this.newAccountGroup.value).then(response => {
        this.toastr.success('Akun '+response.name+' berhasil dibuat', 'Akun dibuat');
        this.dialogRef.close(response)
      }).catch(error => {
        this.toastr.error(error.message, 'Error membuat akun');
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
