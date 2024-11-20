import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { internationalProduct } from '../models/internationalProducts';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getProducts(): Observable<internationalProduct[]> {
    return this.http.get<internationalProduct[]>(this.apiUrl);
  }
  public getProduct(id: string): Observable<internationalProduct> {
    return this.http.get<internationalProduct>(`${this.apiUrl}/${id}`);
  }
}
