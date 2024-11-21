import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ProductService } from '../../../services/product.service';
import { Customer } from '../../../models/customer';
import { Product } from '../../../models/product';
import {KeyValuePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [
    NgForOf,
    KeyValuePipe
  ],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {
  productStatistics: { [key: string]: number } = {};

  userStatistics: { total: number, admin: number, customer: number } = { total: 0, admin: 0, customer: 0 };

  constructor(private userService: UserService, private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProductStatistics();
    this.fetchUserStatistics();
  }

  fetchProductStatistics(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.productStatistics = products.reduce((acc, product) => {
        if (product.category) {
          acc[product.category] = (acc[product.category] || 0) + 1;
        }
        return acc;
      }, {} as { [key: string]: number });
    });
  }


  fetchUserStatistics(): void {
    this.userService.getUsers().subscribe((users: Customer[]) => {
      this.userStatistics.total = users.length;
      this.userStatistics.admin = users.filter(user => user.role === 'admin').length;
      this.userStatistics.customer = users.filter(user => user.role === 'customer').length;
    });
  }
}
