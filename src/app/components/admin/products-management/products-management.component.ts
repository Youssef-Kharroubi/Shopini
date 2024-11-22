import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [
    MatPaginator,
    MatSort,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    NgForOf,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [ProductService],
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.css']
})
export class ProductsManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'description','category','isAvailable', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  categories: string[] = ['Electronics', 'Clothes', 'Books', 'Home', 'Sports'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('nameInput') nameInput!: ElementRef;

  nameFilter: string = '';
  categoryFilter: string = '';
  priceSort: string = 'asc';
  product: Product;

  constructor(private productService: ProductService, private dialog: MatDialog) {
    this.product = {} as Product;
  }

  ngOnInit() {
    this.loadProducts();
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      return data.name.trim().toLowerCase().includes(filter);
    };
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.dataSource.data = products;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyPriceSort() {
    const sortState: Sort = { active: 'price', direction: this.priceSort as 'asc' | 'desc' };
    this.dataSource.sort!.active = sortState.active;
    this.dataSource.sort!.direction = sortState.direction;
    this.dataSource.sort!.sortChange.emit(sortState);
  }
  applyNameFilter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = inputValue.trim().toLowerCase();
  }

  applyCategoryFilter() {
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      return this.categoryFilter ? data.category === this.categoryFilter : true;
    };
    this.dataSource.filter = this.categoryFilter;
  }

  clearFilters() {
    this.nameFilter = '';
    this.categoryFilter = '';
    this.dataSource.filter = '';
    this.nameInput.nativeElement.value = '';
  }

  onDelete(product: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product).subscribe(() => this.loadProducts());
    }
  }

  onUpdate(product: Product) {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe((updatedProduct) => {
      if (updatedProduct) {
        this.productService.updateProduct(updatedProduct).subscribe(() => this.loadProducts());
      }
    });
  }
  onAdd(product: Product){
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '400px',
      data: { product: product || {}, categories: this.categories }
    });
    dialogRef.afterClosed().subscribe((newProduct) => {

      if(newProduct){
        this.productService.addProduct(newProduct).subscribe(() => this.loadProducts());
      }
    })
  }
}
