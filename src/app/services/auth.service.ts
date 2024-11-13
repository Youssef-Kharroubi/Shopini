// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable} from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import {customer} from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/customers'; // Replace with your API URL
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
  signUp(username: string, password: string, email: string): Observable<any> {
    const newCustomer = {
      username,
      password,
      email,
      role: 'customer'
    };

    console.log('Sending POST request with data:', newCustomer);  // Debugging line

    return this.http.post<any>(this.apiUrl, newCustomer).pipe(
      tap(response => {
        console.log('POST response:', response); // Confirm successful POST response
      }),
      catchError((error) => {
        console.error('Error during POST request:', error);  // Handle error if any
        throw error;
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        // Store the token and role in localStorage
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('role', response.role); // Store role (admin or customer)
        this.userSubject.next(response);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isCustomer(): boolean {
    return this.getRole() === 'customer';
  }
}
