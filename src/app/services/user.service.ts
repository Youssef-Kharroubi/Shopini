import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient, private router: Router) {}
  public getUsers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }
  public addUser(user: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, user);
  }
  public updateUser(user: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${user.id}`, user);
  }
  public deleteUser(user: Customer): Observable<Customer>{
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.delete<Customer>(url);
  }
}
