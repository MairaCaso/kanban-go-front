import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { MatDialogRef } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { Task } from '@domain/models/task/task.model';

@Component({
  selector: 'app-task-form',
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
    MatOptionModule,
    FormsModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Input() modalTitle: string = '';
  taskForm: FormGroup = new FormGroup({});

  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  STATUS_OPTIONS = [
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'Activa', label: 'Activa' },
    { value: 'Finalizada', label: 'Finalizada' },
  ];

  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>
  ) {}

  ngOnInit(): void {
    this.loadForm();
  }

  get formControl() {
    return this.taskForm.controls;
  }

  loadForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [''],
    });
  }

  getErrorMessage(controlName: string) {
    return this.formControl[controlName].hasError('required')
      ? 'You must enter a value'
      : this.formControl[controlName].hasError('title')
      ? 'Not a valid email'
      : '';
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.taskForm.valid) {
      this.formSubmit.emit(this.taskForm.value);
      this.dialogRef.close();
    }
  }

  onCloseDialog() {
    this.dialogRef.close();
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

  handleSuccessfulLogin() {
    alert('Tarea creada');
  }

  displayLoginError() {
    alert(this.errorMessage);
  }
}
