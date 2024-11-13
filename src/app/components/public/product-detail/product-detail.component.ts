import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Product } from '../../../models/product';
import { Location } from '@angular/common';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports:[HttpClientModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id!: string;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,  // Inject the Location service
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Get the product ID from the route
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      console.log(`Product ID: ${idParam}`);
      this.fetchProductDetails(idParam);
    } else {
      console.error('Product ID is missing in the route parameters!');
    }
  }

  fetchProductDetails(idParam:string): void {
    // Fetch the product list from the local JSON file (or API)
    this.http.get<Product[]>('assets/products.json').subscribe(
      (products) => {
        this.product = products.find((p) => p.id == idParam);

        if (!this.product) {
          console.error('Product not found!');
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  goBack(): void {
    this.location.back();
  }
}
