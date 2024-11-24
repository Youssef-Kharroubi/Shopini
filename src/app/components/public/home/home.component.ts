import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router module

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  onGetStarted() {
    this.router.navigate(['/products']); 
  }
}
