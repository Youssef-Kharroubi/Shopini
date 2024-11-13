import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Observable} from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        NgIf,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn$!: Observable<boolean>; // Use ! to declare without immediate initialization
  logedInUser: boolean = false;
  constructor(private authService: AuthService) {}
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
