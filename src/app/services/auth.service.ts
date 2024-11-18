import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface User {
  username: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
  address: {
    street: string;
    city: string;
    district: string;
    state: string;
    zip: string;
  };
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
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    birthDate: string,
    street: string,
    city: string,
    district: string,
    state: string,
    zip: string,
    status: string,
    role: string
  ): Observable<any> {
    const newCustomer = {
      firstName,
      lastName,
      email,
      phone,
      password,
      birthDate,
      address: {
        street,
        city,
        district,
        state,
        zip
      },
      status,
      role
    };

    console.log('Sending POST request with data:', newCustomer);

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

  login(firstName: string, password: string): Observable<User> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((f) => f.username === firstName && f.password === password);
        console.log('User found:', user);
        if (user) {
          this.loggedIn.next(true);
          const token = this.generateToken();
          localStorage.setItem('authToken', token);
          localStorage.setItem('role', user.role);
          console.log(user.role);
          if (user.role === 'admin') {
            this.router.navigate(['/productManagement']);
          } else {
            this.router.navigate(['/products']);
          }
          return user; // Return user data for potential further use
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
