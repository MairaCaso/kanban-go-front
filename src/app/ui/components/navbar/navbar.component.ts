import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/common/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    MatMenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  expanded = false;
  isLoggedIn: boolean = false;
  user: any;

  constructor(private authService: AuthService, private _router: Router) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.user = user;
    });
  }

  toggleMenu() {
    this.expanded = !this.expanded;
  }

  public logout(): void {
    localStorage.removeItem('userToken');
    this._router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
