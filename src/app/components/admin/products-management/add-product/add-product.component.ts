import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productForm = this.fb.group({
      name: [data.name || ''],
      price: [data.price || 0],

    });
  }

  ngOnInit(): void {}

  onSave() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.dialogRef.close(this.productForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
