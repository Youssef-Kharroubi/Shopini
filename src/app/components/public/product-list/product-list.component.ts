import {Component, OnInit} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import { ProductService } from '../../../services/product.service'
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
  providers:[ProductService],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: Observable<Product[]> | undefined;

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.products = this.productService.getAllProducts();
  }
}
