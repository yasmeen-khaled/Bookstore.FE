import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class IsNotLoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('UserToken2');

    if (token) {

      this.router.navigate(['/books/list']);
      return false;

    } else {
      return true;
    }
  }
}
