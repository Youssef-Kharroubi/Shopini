import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { internationalProduct } from '../../../models/internationalProducts';
import { ApiService } from '../../../services/api.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgForOf, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [
    MatPaginatorModule,
    ProductCardComponent,
    NgForOf,
    SlicePipe,
    FormsModule,
  ],
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  normalProducts: Product[] = [];
  internationalProducts: Product[] = [];
  normalProductsPage: Product[] = [];
  internationalProductsPage: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedNormalCategory: string = '';
  uniqueNormalCategories: string[] = [];
  filteredNormalProducts: Product[] = [];
  filteredNormalProductsPage: Product[] = [];
  filteredProducts: Product[] = [];

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
      this.uniqueNormalCategories = [...new Set(
        this.normalProducts
          .map(product => product.category)
          .filter(category => category !== undefined)
      )];
      this.filteredNormalProducts = [...this.normalProducts];
      this.updateCurrentPageNormalProducts();
    }, (error) => {
      console.error('Error fetching normal products:', error);
    });
  }


  // Filter Normal Products by Category
  applyNormalCategoryFilter(): void {
    this.filteredNormalProducts = this.selectedNormalCategory
      ? this.normalProducts.filter(product => product.category === this.selectedNormalCategory)
      : [...this.normalProducts];
    this.updateCurrentPageNormalProducts();
  }

  // Fetch International Products
  fetchInternationalProducts(): void {
    this.apiService.getProducts().subscribe((data: internationalProduct[]) => {
      const normalizedProducts = data.map((prod) => this.normalizeInternationalProduct(prod));
      this.internationalProducts = normalizedProducts.map(product => ({
        ...product,
        source: 'api',
      }));

      this.filteredProducts = [...this.internationalProducts];
      this.updateCurrentPageInternationalProducts();
    });
  }

  // Apply Filters for International Products (Search + Category)
  applyFilters(): void {
    this.filteredProducts = this.internationalProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesSearch ;
    });
    this.updateCurrentPageInternationalProducts(); // Update paginator after filtering
  }

  // Update Pagination for Normal Products
  updateCurrentPageNormalProducts(): void {
    if (this.normalPaginator && this.filteredNormalProducts) {
      const startIndex = this.normalPaginator.pageIndex * this.normalPaginator.pageSize;
      const endIndex = startIndex + this.normalPaginator.pageSize;
      this.filteredNormalProductsPage = this.filteredNormalProducts.slice(startIndex, endIndex);
    }
  }

  // Update Pagination for International Products
  updateCurrentPageInternationalProducts(): void {
    if (this.internationalPaginator && this.filteredProducts) {
      const startIndex = this.internationalPaginator.pageIndex * this.internationalPaginator.pageSize;
      const endIndex = startIndex + this.internationalPaginator.pageSize;
      this.internationalProductsPage = this.filteredProducts.slice(startIndex, endIndex);
    }
  }

  // Normalize `internationalProduct` to match `Product`
  normalizeInternationalProduct(prod: internationalProduct): Product {
    return {
      id: prod.id,
      name: prod.title,
      price: prod.price,
      description: prod.description,
      isAvailable: true,
      releaseDate: new Date(),
      image: prod.category.image,
      comments: [],
      source: 'api',
      category: prod.category.name,
    };
  }

  // Shuffle array for random ordering
  shuffleArray(array: Product[]): Product[] {
    return array.sort(() => Math.random() - 0.5);
  }

  onNormalProductsPageChange(event: any): void {
    this.updateCurrentPageNormalProducts();
  }

  onInternationalProductsPageChange(event: any): void {
    this.updateCurrentPageInternationalProducts();
  }
}
