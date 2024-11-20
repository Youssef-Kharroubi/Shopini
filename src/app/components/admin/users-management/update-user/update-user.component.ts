import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';
import {Customer} from '../../../../models/customer';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf
  ],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userForm: FormGroup;
  user: Customer;
  public roles: string[] = ['Admin', 'Customer'];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  Customer ,
  ) {
   this.user = { ...data };
    this.userForm = this.fb.group({
      id: [this.user.id],
      username: [this.user.username, [Validators.required, Validators.minLength(3)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [this.user.role, Validators.required],
    });

  }

  ngOnInit(): void {}

  onSave() {

    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
