import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../../models/product';
import {Location, NgIf} from '@angular/common';
import { ApiService } from '../../../services/api.service';
import {highlightPipe} from '../../../pipes/highlight.pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [HttpClientModule, NgIf,highlightPipe],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id!: string;
  product: any;  // Allow product to be undefined initially
  sourceParam: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private location: Location,  // Inject the Location service
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Get the product ID from the route
    const idParam = this.route.snapshot.paramMap.get('id');
     this.sourceParam = this.route.snapshot.paramMap.get('source');

    console.log(`Product ID: ${idParam}`);
    if (idParam) {
      this.fetchProductDetails(idParam,this.sourceParam);
    } else {
      console.error('Product ID is missing in the route parameters!');
    }
  }

  fetchProductDetails(idParam: string, sourceParam: string | null): void {

    if ('api' !== sourceParam) {

      this.http.get<{ products: Product[] }>('assets/products.json').subscribe(
        (response) => {
          if (response && Array.isArray(response.products)) {
            this.product = response.products.find((p) => p.id == idParam);
            if (!this.product) {
              console.error('Product not found!');
            }
          } else {
            console.error('Unexpected response format:', response);
          }
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      this.apiService.getProduct(idParam).subscribe((data: any) => {
        this.product = data;
        console.log(this.product);

      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
