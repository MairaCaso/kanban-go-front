import { Component, Input } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task-card',
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
  ],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() modalTitle: string = '';
  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.email]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  errorMessage: string = '';

  constructor(private fb: FormBuilder) {}

  get formControl() {
    return this.taskForm.controls;
  }

  getErrorMessage(controlName: string) {
    return this.formControl[controlName].hasError('required')
      ? 'You must enter a value'
      : this.formControl[controlName].hasError('title')
      ? 'Not a valid email'
      : '';
  }

  onSubmit() {
    // if (this.taskForm.valid) {
    //   this._taskGateway
    //     .create(this.taskForm.value)
    //     .pipe(
    //       catchError((error) => {
    //         this.handleLoginError(error);
    //         return throwError(() => new Error('No fue posible crear la tarea'));
    //       })
    //     )
    //     .subscribe({
    //       next: (value) => {
    //         this.handleSuccessfulLogin(value);
    //       },
    //       error: (error) => {
    //         console.error('Login error:', error);
    //         this.displayLoginError();
    //       },
    //     });
    // }
  }

  handleLoginError(error: any) {
    if (error.status === 401) {
      this.errorMessage = 'Invalid title or description';
    } else {
      this.errorMessage = 'An error occurred';
    }
    console.error('task error:', error);
    this.displayLoginError();
  }

  handleSuccessfulLogin(value: any) {
    // Store user data or token in local storage
    alert('Tarea creada');
  }

  displayLoginError() {
    alert(this.errorMessage);
  }
}
