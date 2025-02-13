import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  priceMin: number | null = null;
  priceMax: number | null = null;
  displayedColumns: string[] = ['name', 'description', 'price', 'stock', 'category', 'actions'];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  isAdminOrManager(): boolean {
    const role = this.authService.getUserRole();
    return role === 'admin' || role === 'manager';
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory =
        this.selectedCategory === '' || product.category?.name === this.selectedCategory;
      const matchesPriceMin = this.priceMin === null || product.price >= this.priceMin;
      const matchesPriceMax = this.priceMax === null || product.price <= this.priceMax;

      return matchesCategory && matchesPriceMin && matchesPriceMax;
    });
  }

  openDialog(product?: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: product ? { ...product } : null
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        product ? this.editProduct(result) : this.addProduct(result);
      }
    });
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe(() => this.loadProducts());
  }

  editProduct(product: Product) {
    this.productService.updateProduct(product.id!, product).subscribe(() => this.loadProducts());
  }   

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }
}
