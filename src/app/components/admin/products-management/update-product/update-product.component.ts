import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../models/product';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit{
  product: Product;

  constructor(
    private dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.product = { ...data };
  }
  ngOnInit(): void {}

  // Method to close dialog and return the updated product
  onSave() {
    this.dialogRef.close(this.product);
  }

  // Method to cancel update and close dialog
  onCancel() {
    this.dialogRef.close(null);
  }
}
