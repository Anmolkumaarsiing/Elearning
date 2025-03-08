import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent]
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';  // Store error messages

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Initialize signup form with email and password fields
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // email is required and must be in valid format
      password: ['', [Validators.required, Validators.minLength(6)]]  // password is required and must have a minimum length of 6 characters
    });
  }

  // Method called on signup form submission
  onSignup() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;

      // Call the signup method from AuthService
      this.authService.signup(email, password).subscribe({
        next: () => {
          // Clear the error message upon successful signup
          this.errorMessage = '';
        },
        error: (error) => {
          // Display the error message received from AuthService
          this.errorMessage = error;
        }
      });
    } else {
      // Handle form invalid submission
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
}
