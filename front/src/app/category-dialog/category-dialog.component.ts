import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent {
  category: Category;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category | null
  ) {
    this.category = data ? { ...data } : { name: '', description: '' };
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.category);
  }
}
