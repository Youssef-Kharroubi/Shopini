import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

  @Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    private jsonUrl = 'http://localhost:3000/products';

    constructor(private http: HttpClient) {}

    getAllProducts(): Observable<Product[]> {
      console.log(this.jsonUrl)
      return this.http.get<Product[]>(this.jsonUrl);

    }
    updateProduct(product: Product): Observable<Product> {
      const url = `${this.jsonUrl}/${product.id}`;
      console.log(url);
      return this.http.put<Product>(url, product);
    }
    deleteProduct(product: Product): Observable<Product> {
      const url = `${this.jsonUrl}/${product.id}`;
      console.log(url);
      return this.http.delete<Product>(url);
    }

  }
