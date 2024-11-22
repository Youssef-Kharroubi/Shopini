import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  public categories: string[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product, categories: string[] },
  ) {
    this.productForm = this.fb.group({
      name: [data.product.name || '', [Validators.required, Validators.minLength(3)]],
      price: [data.product.price || 0, [Validators.required, Validators.min(0)]],
      isAvailable: [data.product.isAvailable || true],
      image: [data.product.image || ''],
      category: [data.product.category || '', Validators.required],
      description: [data.product.description || '', [Validators.required, Validators.minLength(10)]],
    });
    this.categories = data.categories;
  }

  ngOnInit(): void {}

  onSave() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
