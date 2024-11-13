import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

  @Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    private jsonUrl = 'assets/products.json';

    constructor(private http: HttpClient) {}

    getAllProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.jsonUrl);
    }

  }
