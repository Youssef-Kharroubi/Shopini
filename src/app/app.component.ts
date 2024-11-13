import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  providers: [AuthService],
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgOptimizedImage, HttpClientModule, AsyncPipe, NgIf],
})
export class AppComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>; // Use ! to declare without immediate initialization
  logedInUser: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {

  }
  ngDoCheck(): void{
    const token = localStorage.getItem('authToken');
    if (token && !this.isLoggedIn$) {
      this.logedInUser = true
    }

  }
  onLogout() {
    this.authService.logout();
    this.logedInUser = false;
  }
}
