import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  openDialog(category?: Category) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: category ? { ...category } : null
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        category ? this.updateCategory(result) : this.addCategory(result);
      }
    });
  }

  addCategory(category: Category) {
    this.categoryService.addCategory(category).subscribe(() => this.loadCategories());
  }

  updateCategory(category: Category) {
    this.categoryService.updateCategory(category.id!, category).subscribe(() => this.loadCategories());
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => this.loadCategories());
  }
}
