import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {ProductCardComponent} from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    HttpClientModule,
    NgIf,
    NgForOf,
    ProductCardComponent,

  ],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.products = this.http.get<Product[]>('assets/products.json');
  }
}
