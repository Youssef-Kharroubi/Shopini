import { Component, OnInit } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';  // Import CommonModule
import { Router, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logedInUser: boolean = false;
  currentRoute: string = '';  // Declare currentRoute here

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

  getUserRole() {
    this.logedInUser = localStorage.getItem('role') !== null;
    return localStorage.getItem('role');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.logedInUser = false;
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;  // Store the current route
    });
  }
}
