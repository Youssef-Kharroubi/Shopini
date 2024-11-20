import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { internationalProduct } from '../../../models/internationalProducts';
import { ApiService } from '../../../services/api.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgForOf, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [
    MatPaginatorModule,
    ProductCardComponent,
    NgForOf,
    SlicePipe,
  ],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  normalProducts: Product[] = [];
  internationalProducts: Product[] = [];
  normalProductsPage: Product[] = [];
  internationalProductsPage: Product[] = [];

  @ViewChild('normalPaginator') normalPaginator!: MatPaginator;
  @ViewChild('internationalPaginator') internationalPaginator!: MatPaginator;

  constructor(private apiService: ApiService, private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchNormalProducts();
    this.fetchInternationalProducts();
  }

  ngAfterViewInit(): void {
    if (this.normalPaginator) {
      this.normalPaginator.page.subscribe(() => {
        this.updateCurrentPageNormalProducts();
      });
    }
    if (this.internationalPaginator) {
      this.internationalPaginator.page.subscribe(() => {
        this.updateCurrentPageInternationalProducts();
      });
    }
  }

  fetchNormalProducts(): void {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.normalProducts = this.shuffleArray(data);
      this.updateCurrentPageNormalProducts();
    });
  }

  fetchInternationalProducts(): void {
    this.apiService.getProducts().subscribe((data: internationalProduct[]) => {
      const normalizedProducts = data.map((prod) => this.normalizeInternationalProduct(prod));
      this.internationalProducts = normalizedProducts.map(product => ({
        ...product,
        source: 'api',  // Mark these as 'api' products
      }));
      this.updateCurrentPageInternationalProducts();
    });
  }

  updateCurrentPageNormalProducts(): void {
    if (this.normalPaginator && this.normalProducts) {
      const startIndex = this.normalPaginator.pageIndex * this.normalPaginator.pageSize;
      const endIndex = startIndex + this.normalPaginator.pageSize;
      this.normalProductsPage = this.normalProducts.slice(startIndex, endIndex); // Slice the array based on paginator
    }
  }

  updateCurrentPageInternationalProducts(): void {
    if (this.internationalPaginator && this.internationalProducts) {
      const startIndex = this.internationalPaginator.pageIndex * this.internationalPaginator.pageSize;
      const endIndex = startIndex + this.internationalPaginator.pageSize;
      this.internationalProductsPage = this.internationalProducts.slice(startIndex, endIndex); // Slice the array based on paginator
    }
  }

  // Normalize `internationalProduct` to match `Product`
  normalizeInternationalProduct(prod: internationalProduct): Product {
    return {
      id: prod.id,
      name: prod.title, // Map `title` to `name`
      price: prod.price,
      description: prod.description,
      isAvailable: true, // Default value or map if available
      releaseDate: new Date(), // Default value or map if available
      image: prod.images[0], // Map nested `category.image`
      comments: [], // Default empty array
      source: 'api', // Mark these as 'api' products
    };
  }

  shuffleArray(array: Product[]): Product[] {
    return array.sort(() => Math.random() - 0.5);
  }

  // Handlers for paginator page changes
  onNormalProductsPageChange(event: any): void {
    this.updateCurrentPageNormalProducts();
  }

  onInternationalProductsPageChange(event: any): void {
    this.updateCurrentPageInternationalProducts();
  }
}
