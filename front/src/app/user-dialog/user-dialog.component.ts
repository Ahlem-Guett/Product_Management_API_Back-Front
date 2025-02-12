import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: any }
  ) {
    this.userForm = this.fb.group({
      email: [data.user?.email || '', [Validators.required, Validators.email]],
      role: [data.user?.role || '', Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      if (this.data.user) {
        this.userService.updateUser(this.data.user.id, userData).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.userService.addUser(userData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }
}
