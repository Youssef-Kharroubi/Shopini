import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
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
  logedInUser: boolean = false;
  constructor(private authService: AuthService,private router: Router) {}
  getUserRole(){
    this.logedInUser = localStorage.getItem('role') !== null;
    return localStorage.getItem('role');
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.logedInUser = false;
  }
}
