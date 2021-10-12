import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountPostDao } from 'src/app/_data/dao/account-dao';

@Component({
  selector: 'app-new-account-dialog',
  templateUrl: './new-account-dialog.component.html',
  styleUrls: ['./new-account-dialog.component.css']
})
export class NewAccountDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NewAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountPostDao,
  ) { }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
