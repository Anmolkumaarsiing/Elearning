import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // If the user is not logged in, redirect them to the login page
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);  // Redirect to login if not logged in
      return false;  // Deny access to the route
    }

    // If the user is logged in, allow access to the route
    return true;
  }
}
