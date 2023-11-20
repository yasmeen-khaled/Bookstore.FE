import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('UserToken2');

    // TODO: Check if the token is present and not expired
    if (token) {
      const decodedToken = jwt_decode.jwtDecode(token) as any;
      console.log('decoded token', decodedToken);

      if (decodedToken && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin') {
        return true;
      } else {
        // If not an admin, redirect to a non-admin page (optional)
        this.router.navigate(['/books/list']);
        return false;
      }
    } else {
      // If token is missing or expired, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
