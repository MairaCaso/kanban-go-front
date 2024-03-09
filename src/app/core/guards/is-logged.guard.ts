import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/common/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class isUserLogged implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
