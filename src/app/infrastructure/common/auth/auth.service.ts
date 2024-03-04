import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.currentUser();
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  public currentUser(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedUser = this.jwtHelper.decodeToken(token);
      this.currentUserSubject.next(decodedUser);
    } else {
      this.currentUserSubject.next(null);
    }
  }
}
