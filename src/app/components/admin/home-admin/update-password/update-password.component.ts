import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatOption} from '@angular/material/core';
import {UserService} from '../../../../services/user.service'
import {MatSelect} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    FormsModule,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {

  userForm: FormGroup;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<UpdatePasswordComponent>,private userService: UserService) {
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const rePassword = form.get('rePassword')?.value;
    return newPassword === rePassword ? null : { passwordsMismatch: true };
  }

  onSave() {
    const { password, newPassword } = this.userForm.value;
    const id = localStorage.getItem("id");
    this.userService.getAdminPwd(id).subscribe(currentPassword => {
      if (password !== currentPassword) {
        alert('Old password is incorrect!');
        return;
      }
      if (this.userForm.errors?.['passwordsMismatch']) {
        alert('New passwords do not match!');
        return;
      }
      this.userService.updateAdminPwd(id, newPassword).subscribe();
      this.userForm.reset();
      alert('Password updated successfully!');
    });
  }
  onCancel() {
    this.dialogRef.close(null);
  }
}
