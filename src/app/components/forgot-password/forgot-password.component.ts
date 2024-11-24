import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule], 
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  resetForm: FormGroup;
  passwordVisible = false; 

  constructor(private formBuilder: FormBuilder,private router: Router,private dialogRef: MatDialogRef<ForgotPasswordComponent>) {
    this.resetForm = this.formBuilder.group({
      username: ['', [Validators.required]],  
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]]
    });
  }

  onResetPassword(): void {
    if (this.resetForm.valid) {
      const { username, newPassword } = this.resetForm.value;
      console.log(`Password reset for ${username} with new password: ${newPassword}`);
      
     
      localStorage.setItem('username', username);  
      localStorage.setItem('userPassword', newPassword); 
  
     
      this.dialogRef.close();
      this.router.navigate(['/login']);
      
      alert('Password reset successfully!');
    } else {
      alert('Please fix the errors in the form.');
    }
  }
  
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;  
  }
  
}
