import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { Customer } from "../models/customer"
import { tap } from 'rxjs/operators';

export interface User {
  id:string;
  username: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
  status: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/customers';
  private loggedIn = new BehaviorSubject<boolean>(false);
  public readonly loggedIn$ = this.loggedIn.asObservable();
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
  signUp(
    username: string,
    email: string,
    phone: string,
    password: string,
    birthDate: string,
    status: string,
    role: string
  ): Observable<Customer> {
    const newCustomer = {
      username,
      email,
      phone,
      password,
      birthDate,
      status,
      role
    };

    console.log('Sending POST request with data:', newCustomer);

    return this.http.post<Customer>(this.apiUrl, newCustomer).pipe(
      tap(response => {
        console.log('POST response:', response);
        this.router.navigate(['/home']);
      }),
      catchError((error) => {
        console.error('Error during POST request:', error);  // Handle error if any
        throw error;
      })
    );
  }

  login(firstName: string, password: string): Observable<Customer> {
    return this.http.get<Customer[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((f) => f.username === firstName && f.password === password);
        if (user) {
          this.loggedIn.next(true);
          const token = this.generateToken();
          localStorage.setItem('authToken', token);
          localStorage.setItem('role', user.role);
          localStorage.setItem('id', user.id);
          if (user.role === 'admin') {
            this.router.navigate(['/HomeAdmin']);
          } else {
            this.router.navigate(['/products']);
          }
          return user;
        } else {
          throw new Error('Invalid username or password');
        }
      }),
      catchError((error) => throwError(() => new Error(error.message || 'Login error')))
    );
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    this.loggedIn.next(false);

  }
  public checkAuthStatus(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
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
