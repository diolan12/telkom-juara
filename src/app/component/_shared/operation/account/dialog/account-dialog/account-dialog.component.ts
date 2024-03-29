import { Component, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Account, AccountDTO, PasswordErrorStateMatcher } from 'src/app/_data/model/account';
import { Role } from 'src/app/_data/model/role';
import { AccountService } from 'src/app/_data/repository/account/account.service';
import { AuthService } from 'src/app/_data/service/auth.service';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent {

  account: Account | null = null;

  togglePassword = true;
  // account form group
  accountFormGroup: UntypedFormGroup;
  passwordMatcher = new PasswordErrorStateMatcher();

  roles: Array<Role> = [
    { value: 0, text: 'Administrator' },
    { value: 1, text: 'Petugas Kantor' },
    { value: 2, text: 'Teknisi' }
  ];

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Account,
    private formBuilder: UntypedFormBuilder
  ) {
    authService.account().then(account => {
      this.account = account;
      if (account.role === 0) {
        this.roles = [
          { value: 0, text: 'Administrator' },
          { value: 1, text: 'Petugas Kantor' },
          { value: 2, text: 'Teknisi' }
        ]
      } else {
        this.roles = [
          { value: 1, text: 'Petugas Kantor' },
          { value: 2, text: 'Teknisi' }
        ]
      }
    })
    
    if (data == null) {
      this.accountFormGroup = this.formBuilder.group(AccountDTO.postValidator, { validators: AccountDTO.passwordMatcher })
    } else {
      this.accountFormGroup = this.formBuilder.group(AccountDTO.putValidator(data), { validators: AccountDTO.passwordMatcher })
    }
  }

  create() {
    if (this.accountFormGroup.invalid) {
      this.toastr.error('Invalid form', 'Error');
    } else {
      this.accountService.create(this.accountFormGroup.value).then(response => {
        this.toastr.success('Account created', 'Success');
        this.dialogRef.close(response);
      }).catch(error => {
        this.toastr.error(error.message, 'Error');
      });
    }
  }

  update() {
    if (this.accountFormGroup.invalid) {
      this.toastr.error('Invalid form', 'Error');
    } else {
      this.accountService.update(this.data.id, this.accountFormGroup.value).then(response => {
        this.toastr.success('Account updated', 'Success');
        this.dialogRef.close(response);
      }).catch(error => {
        this.toastr.error(error.message, 'Error memperbarui akun');
      });
    }
  }

  delete() {
    this.accountService.delete(this.data.id).then(response => {
      this.toastr.success('Account deleted', 'Success');
      this.dialogRef.close(response);
    }).catch(error => {
      this.toastr.error(error.message, 'Error');
    });
  }

}
