import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  // Signup Method
  signup(email: string, password: string): Observable<void> {
    return new Observable((observer) => {
      createUserWithEmailAndPassword(this.auth, email, password)
        .then(() => {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/courses']);
          observer.next(); // emit success
          observer.complete();
        })
        .catch((error: any) => {
          let errorMessage = 'An error occurred during signup. Please try again.';
  
          // Check specific Firebase error codes
          if (error && error.code) {
            switch (error.code) {
              case 'auth/email-already-in-use':
                errorMessage = 'An account with this email already exists.';
                break;
              case 'auth/invalid-email':
                errorMessage = 'The email address is not valid.';
                break;
              case 'auth/weak-password':
                errorMessage = 'Password should be at least 6 characters.';
                break;
              case 'auth/invalid-credential':
                errorMessage = 'Invalid credentials provided.';
                break;
              default:
                errorMessage = error.message || errorMessage;
                break;
            }
          } else if (error && error.message) {
            // If error doesn't have a code, use the message
            errorMessage = error.message;
          }
  
          // Do not log sensitive error (like account already exists)
          if (error.code !== 'auth/email-already-in-use') {
            console.error("Signup Error:", error); // Log the error only if it's not the 'email already in use' error
          }
  
          observer.error(errorMessage); // emit error with custom message
        });
    });
  }
  
  // Login Method
  login(email: string, password: string): Observable<void> {
    return new Observable((observer) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then(() => {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/courses']);
          observer.next(); // emit success
          observer.complete();
        })
        .catch((error: any) => {
          let errorMessage = 'An error occurred during login. Please try again.';
  
          // Map Firebase error codes to user-friendly messages
          if (error && error.code) {
            switch (error.code) {
              case 'auth/user-not-found':
                errorMessage = 'No account found with this email address.';
                break;
              case 'auth/wrong-password':
                errorMessage = 'Incorrect password. Please try again.';
                break;
              case 'auth/invalid-email':
                errorMessage = 'The email address is not valid.';
                break;
              case 'auth/invalid-credential':
                errorMessage = 'Invalid credentials provided.';
                break;
              default:
                errorMessage = error.message || errorMessage;
                break;
            }
          } else if (error && error.message) {
            // Use the message from Firebase if no error code is available
            errorMessage = error.message;
          }
  
          observer.error(errorMessage); // Emit the error message for the component to display
        });
    });
  }
  
  // Logout Method
  logout(): Observable<void> {
    return new Observable((observer) => {
      signOut(this.auth)
        .then(() => {
          localStorage.removeItem('isLoggedIn');
          this.router.navigate(['/login']);
          observer.next(); // emit success
          observer.complete();
        })
        .catch((error) => {
          observer.error('An error occurred during logout.');
        });
    });
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
