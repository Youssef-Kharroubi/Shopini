import {Component, inject, OnInit } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import { HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgClass,CommonModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  // Today's date in YYYY-MM-DD format
  today: string = new Date().toISOString().split('T')[0];

  profileForm!: FormGroup; // Add the non-null assertion operator
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private authService: AuthService, private router: Router) {}
  onLogin() {
    // If the form is invalid, don't submit and mark all fields as touched to show validation messages
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  
    const userData = this.loginForm.value;
    const username = userData.username || '';
    const password = userData.password || '';
  
    this.authService.login(username, password).subscribe(
      (user) => {
        console.log('Login successful:', user);
        // Navigate to the dashboard or another page after successful login
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error during login:', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
  
 ngOnInit(): void {
  this.profileForm = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[!@#$%^&*(),.?":{}|<>]).+$'),
      ],
    ],
    birthDate: ['', Validators.required],
    role: ['', Validators.required],
    status: ['', Validators.required],
    isAdmin: [false],
  });
}

toggleSignUp(): void {
  const container = document.getElementById('container');
  if (container) {
    container.classList.add('right-panel-active');
  }
}

toggleSignIn(): void {
  const container = document.getElementById('container');
  if (container) {
    container.classList.remove('right-panel-active');
  }
}




onSignUp() {
  if (this.profileForm.invalid) {
    this.profileForm.markAllAsTouched(); // Make all fields touched to show validation errors
    return;
  }
  const userData = this.profileForm.value;
    const role = userData.isAdmin ? 'admin' : 'customer';
    this.profileForm.patchValue({ role: role });

    // Send the data to json-server
    this.authService
      .signUp(
        userData.fullName,
        userData.email,
        userData.phone,
        userData.password,
        userData.birthDate,
        userData.status,
        role
      )
      .subscribe(
        (response) => {
          console.log('Customer successfully signed up:', response); // Confirm success
          this.router.navigate(['/login']); // Navigate to login after success
        },
        (error) => {
          console.error('Error during sign-up:', error); // Log error if it occurs
        }
      );
  }

  allowOnlyLetters(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Allow uppercase and lowercase letters (A-Z, a-z)
    if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
      event.preventDefault();
    }
  }

  // Allow only numeric values, Backspace, and Enter keys
  allowOnlyNumbers(event: KeyboardEvent): void {
    const key = event.key;
    // Allow numeric values, Backspace, and Enter keys
    if (!/[\d]/.test(key) && key !== 'Backspace' && key !== 'Enter') {
      event.preventDefault();
    }
  }


}
