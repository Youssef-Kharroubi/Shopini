import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {Observable} from 'rxjs';
import {AsyncPipe, DatePipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import {UpdateProductComponent} from './update-product/update-product.component'
@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    AsyncPipe,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers:[ProductService],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.css'
})
export class ProductsManagementComponent implements OnInit{
  products: Observable<Product[]> = new Observable<Product[]>();
  constructor(private productService: ProductService,private http: HttpClient,private dialog: MatDialog) {}
  ngOnInit() {
    this.products = this.productService.getAllProducts();
  }
  onDelete(product: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product).subscribe(
        () => {
          location.reload();
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

  onUpdate(product: Product) {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '400px',
      data: product  // Pass the selected product data to the dialog
    });

    dialogRef.afterClosed().subscribe((updatedProduct) => {
      if (updatedProduct) {
        // Now use the updated product returned from the dialog
        this.productService.updateProduct(updatedProduct).subscribe(
          (response) => {
            console.log('Product updated successfully:', response);
            location.reload();
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      }
    });
  }

}
