import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../models/product.model';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  product: Product;
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
  ) {
    this.product = data
      ? { ...data }
      : { name: '', description: '', price: 0, stock: 0, category: {} as Category };
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;

      // Si on édite un produit, on s'assure que la catégorie est bien référencée
      if (this.product.category && typeof this.product.category === 'string') {
        this.product.category = this.categories.find(cat => cat.name === this.product.category) || {} as Category;
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (!this.product.category || !this.product.category.id) {
      alert('Veuillez sélectionner une catégorie valide.');
      return;
    }
    this.dialogRef.close(this.product);
  }
}
