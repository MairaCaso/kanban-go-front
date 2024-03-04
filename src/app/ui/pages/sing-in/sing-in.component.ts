import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserGateway } from 'src/app/domain/models/user/gateway/user.gateway';

import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/infrastructure/driven-adapters/user/user.service';

@Component({
  selector: 'app-sing-in',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    HttpClientModule,
  ],
  providers: [{ provide: UserGateway, useClass: UserService }],
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})
export class SingInComponent {
  registerForm: FormGroup = new FormGroup({});
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _userGateway: UserGateway
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get formControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this._userGateway
        .create(this.registerForm.value)
        .pipe(
          catchError((error) => {
            this.handleSignInError(error);
            return throwError(() => new Error('Login failed'));
          })
        )
        .subscribe({
          next: (value: any) => {
            this.handleSuccessfulLogin(value);
          },
          error: (error: any) => {
            console.error('Login error:', error);
            this.displayLoginError();
          },
        });
    }
  }

  handleSignInError(error: any) {
    if (error.status === 401) {
      this.errorMessage = 'Invalid email or password.';
    } else {
      this.errorMessage =
        'An error occurred while logging in. Please try again.';
    }
    console.error('Login error:', error);
    this.displayLoginError();
  }

  handleSuccessfulLogin(value: any) {
    // Store user data or token in local storage
    localStorage.setItem('userToken', value.token);

    this._router.navigate(['/home']);
  }

  displayLoginError() {
    alert(this.errorMessage);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'This field is required.';
    } else if (field?.hasError('email')) {
      return 'Invalid email address.';
    }
    return '';
  }
}
