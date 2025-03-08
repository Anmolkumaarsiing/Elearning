import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = ''; // To store the error message

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Initialize the login form with email and password fields
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // email field with validation
      password: ['', [Validators.required, Validators.minLength(6)]] // password field with validation
    });
  }

  // Method called on login form submission
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Call the login method from AuthService
      this.authService.login(email, password).subscribe({
        next: () => {
          // Clear error message upon successful login
          this.errorMessage = '';
        },
        error: (error) => {
          // Set the error message to be displayed on the page
          this.errorMessage = error;  // Display the error message from AuthService
        }
      });
    } else {
      // Handle form invalid submission
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
}
