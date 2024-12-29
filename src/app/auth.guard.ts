import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      // If no token, redirect to the register page
      this.router.navigate(['/register']);
      return false;
    }
    
    // If token exists, allow access to the route
    return true;
  }
}
