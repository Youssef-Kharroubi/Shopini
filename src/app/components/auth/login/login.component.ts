import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormBuilder,Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import { HttpClientModule} from '@angular/common/http';
import {NgClass} from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgClass],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private authService: AuthService) {}
  onLogin() {

      const userData = this.loginForm.value;
      const username = userData.username || '';
      const password = userData.password || '';
      this.authService.login(username, password).subscribe(
        (user) => {
          console.log('Login successful:', user);
        },
        (error) => {
          console.error('Error during login:', error);
          alert('Login failed. Please check your credentials.');
        }
      );

  }

}
