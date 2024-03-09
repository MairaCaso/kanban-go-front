import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginGateway } from 'src/app/domain/models/login/gateway/login.gateway';
import { catchError, throwError } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/infrastructure/driven-adapters/login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/infrastructure/common/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    RouterLink,
  ],
  providers: [{ provide: LoginGateway, useClass: LoginService }],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]],
  });

  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private _loginGateway: LoginGateway,
    private _router: Router,
    private _authService: AuthService
  ) {}

  get formControl() {
    return this.loginForm.controls;
  }

  getErrorMessage(controlName: string) {
    return this.formControl[controlName].hasError('required')
      ? 'You must enter a value'
      : this.formControl[controlName].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this._loginGateway
        .login(email, password)
        .pipe(
          catchError((error) => {
            this.handleLoginError(error);
            return throwError(() => new Error('Login failed'));
          })
        )
        .subscribe({
          next: (value) => {
            this.handleSuccessfulLogin(value);
          },
          error: (error) => {
            console.error('Login error:', error);
            this.displayLoginError();
          },
        });
    }
  }

  handleLoginError(error: any) {
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

    this._router.navigate(['/board']);
    this._authService.currentUser();
  }

  displayLoginError() {
    alert(this.errorMessage);
  }
}
