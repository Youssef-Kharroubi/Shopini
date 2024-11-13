import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgOptimizedImage,HttpClientModule]
})
export class AppComponent {
  title = 'untitled';
}
