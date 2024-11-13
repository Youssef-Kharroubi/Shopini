import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormBuilder,Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
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
  constructor(private authService: AuthService, private router: Router) {}
  onLogin() {

      const userData = this.loginForm.value;
      console.log(userData);
      const username = userData.username || '';
      const password = userData.password || '';
      this.authService.login(username, password).subscribe(
        (user) => {
          console.log('Login successful:', user);
          // Redirect is handled in AuthService based on the role
        },
        (error) => {
          console.error('Error during login:', error);
          alert('Login failed. Please check your credentials.');
        }
      );

  }

}
