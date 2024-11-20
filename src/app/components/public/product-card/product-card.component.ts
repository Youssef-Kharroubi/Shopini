import { Component,Input } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() price: number = 0;
  @Input() image: string = '';
  @Input() id: string = '';
  @Input() source!: string;
}
