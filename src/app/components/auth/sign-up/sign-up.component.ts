import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [AuthService],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  // Today's date in YYYY-MM-DD format
  today: string = new Date().toISOString().split('T')[0];

  profileForm!: FormGroup; // Add the non-null assertion operator


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
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
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        district: [''],
        state: [''],
        zip: ['', [Validators.required]], // Correct syntax
      }),
      role: ['', Validators.required],
      status: ['', Validators.required],
      isAdmin: [false],
    });
  }


  onSignUp() {
      const userData = this.profileForm.value;
      const role = userData.isAdmin ? 'admin' : 'customer';
      this.profileForm.patchValue({ role: role });

      // Send the data to json-server
      this.authService
        .signUp(
          userData.firstName,
          userData.lastName,
          userData.email,
          userData.phone,
          userData.password,
          userData.birthDate,
          userData.address.street,
          userData.address.city,
          userData.address.district,
          userData.address.state,
          userData.address.zip,
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
