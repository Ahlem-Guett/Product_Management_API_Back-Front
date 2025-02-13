import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatDialogModule, 
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButton],
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
