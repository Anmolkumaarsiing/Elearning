import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Import HttpClient to make API requests
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUrl = 'http://localhost:3000';  // Your backend API URL

  constructor(private http: HttpClient, private router: Router) {}

  // Signup Method - Send signup request to backend
  signup(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.backendUrl}/api/users/signup`, { email, password }).subscribe({
        next: (response) => {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/courses']);
          observer.next(response); // emit success response
          observer.complete();
        },
        error: (error) => {
          let errorMessage = 'An error occurred during signup. Please try again.';
          if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }
          observer.error(errorMessage); // emit error with custom message
        }
      });
    });
  }

  // Login Method - Send login request to backend
  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.backendUrl}/api/users/login`, { email, password }).subscribe({
        next: (response) => {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/courses']);
          observer.next(response); // emit success response
          observer.complete();
        },
        error: (error) => {
          let errorMessage = 'An error occurred during login. Please try again.';
          if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }
          observer.error(errorMessage); // emit error with custom message
        }
      });
    });
  }

  // Logout Method - Send logout request to backend or just clear localStorage
  logout(): Observable<void> {
    return new Observable((observer) => {
      // Assuming you're logging out on the backend (clear session or JWT token)
      this.http.post(`${this.backendUrl}/api/users/logout`, {}).subscribe({
        next: (response) => {
          // Clear the login status from localStorage
          localStorage.removeItem('isLoggedIn');
          this.router.navigate(['/login']);  // Redirect to login page after successful logout
          observer.next();  // Emit success response
          observer.complete();
        },
        error: (error) => {
          // If there's an error during the logout process
          localStorage.removeItem('isLoggedIn'); // Ensure to clear localStorage even if backend fails
          this.router.navigate(['/login']); // Redirect to login page
          observer.error('An error occurred during logout.');  // Emit error
        }
      });
    });
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
