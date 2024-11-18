import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

  @Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    private jsonUrl = 'http://localhost:3001/products';

    constructor(private http: HttpClient) {}

    getAllProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.jsonUrl);

    }
    updateProduct(product: Product): Observable<Product> {
      const url = `${this.jsonUrl}/${product.id}`;
      return this.http.put<Product>(url, product);
    }
    deleteProduct(product: Product): Observable<Product> {
      const url = `${this.jsonUrl}/${product.id}`;
      return this.http.delete<Product>(url);
    }

  }
