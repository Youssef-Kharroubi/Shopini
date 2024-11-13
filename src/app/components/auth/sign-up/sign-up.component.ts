import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  private formBuilder = inject(FormBuilder);
  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]], // Email validation added
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', Validators.required],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    isAdmin: [false]
  });

  constructor(private authService: AuthService, private router: Router) {}

  // Ensure that the form is valid before submitting
  onSignUp() {

      const userData = this.profileForm.value;
      const role = userData.isAdmin ? 'admin' : 'customer';
      const isAdmin = this.profileForm.get('isAdmin')?.value;
      this.profileForm.patchValue({ role: isAdmin ? 'admin' : 'customer' });
      const firstName = userData.firstName || '';
      const lastName = userData.lastName || '';
      const email = userData.email || '';
      const password = userData.password || '';

      console.log("role",role);
      // Debugging: Log form data
      console.log('Form Data:', firstName, lastName, email, password);

      // Send the data to json-server
      this.authService.signUp(firstName,  lastName, password,role).subscribe(
        (response) => {
          console.log('Customer successfully signed up:', response); // Confirm success
          this.router.navigate(['/login']); // Navigate to login after success
        },
        (error) => {
          console.error('Error during sign-up:', error); // Log error if it occurs
        }
      );
    }


}
