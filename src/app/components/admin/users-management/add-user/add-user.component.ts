import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  public roles: string[] = ['Admin', 'Customer'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      isActive: [true],
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
