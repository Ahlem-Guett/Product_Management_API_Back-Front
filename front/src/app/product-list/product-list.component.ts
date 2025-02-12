import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
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
        product ? this.updateProduct(result) : this.addProduct(result);
      }
    });
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe(() => this.loadProducts());
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product.id!, product).subscribe(() => this.loadProducts());
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }
}
