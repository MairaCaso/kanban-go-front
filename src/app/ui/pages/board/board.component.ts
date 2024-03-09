import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Task } from 'src/app/domain/models/task/task.model';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { TaskGateway } from 'src/app/domain/models/task/gateway/task.gateway';
import { TaskService } from 'src/app/infrastructure/driven-adapters/task/task.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, of } from 'rxjs';
import { ResponseTask } from '@domain/models/general/response/response.model';
import { TaskDTO } from '@domain/models/task/task-DTO.model';
import { MatButtonModule } from '@angular/material/button';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { Status } from '@core/enums/status.enum';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TaskFormComponent,
    MatDialogModule,
    HttpClientModule,
    TaskCardComponent,
  ],
  providers: [{ provide: TaskGateway, useClass: TaskService }],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  @ViewChild('TaskFormComponent') TaskFormComponent!: TaskFormComponent;
  dialogRef!: MatDialogRef<TaskFormComponent>;

  // tasks$: Observable<ResponseTask[]> = of([]);

  tasks$: Observable<ResponseTask[]> = of([]);
  pendingTasks: Task[] = [];
  activeTasks: Task[] = [];
  completedTasks: Task[] = [];

  subscription$!: Subscription;

  constructor(public dialog: MatDialog, private _taskGateway: TaskGateway) {}

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getAllTaskStatus();
  }

  getAllTaskStatus() {
    this.getAllTask(); // Assuming you have a task service
    this.tasks$.subscribe((tasks) => {
      this.pendingTasks = tasks.filter((task) => task.status === 'Pendiente');
      this.activeTasks = tasks.filter((task) => task.status === 'Activa');
      this.completedTasks = tasks.filter(
        (task) => task.status === 'Finalizada'
      );
    });
  }

  // ngOnInit(): void {
  //   this.getAllTask();
  // }

  getAllTask(): void {
    this.tasks$ = this._taskGateway.getAll();
  }

  addNewTask(task: TaskDTO) {
    const newTask = {
      ...task,
      status: Status.PENDING,
    };
    this._taskGateway.create(newTask).subscribe({
      next: () => {
        this.getAllTaskStatus();
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  deleteTask(id: string) {
    this._taskGateway.delete(id).subscribe({
      next: () => {
        this.getAllTaskStatus();
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  editTask(id: string, task: TaskDTO) {
    this._taskGateway.update(id, task).subscribe({
      next: () => {
        this.getAllTaskStatus();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  openTaskModal(event: { action: string; task?: Task }) {
    this.dialogRef = this.dialog.open(TaskFormComponent, {
      height: '355px',
      width: '400px',
    });
    this.dialogRef.componentInstance.modalTitle =
      event.action === 'UPDATE' ? 'Editar' : 'Crear';
    this.dialogRef.afterOpened().subscribe((result) => {
      if (event.action === 'UPDATE' && event.task) {
        this.dialogRef.componentInstance.modalTitle = 'Editar';
        this.dialogRef.componentInstance.taskForm.setValue({
          title: event.task.title,
          description: event.task.description,
          status: event.task.status,
        });
        this.onSaveTask(event.action, event.task._id);
      } else {
        this.dialogRef.componentInstance.modalTitle = 'Crear';
        this.onSaveTask(event.action);
      }
      // Handle form data or component interactions here after full initialization
    });
  }

  onSaveTask(event: string, id?: string) {
    let taskId: string = '';
    if (id) {
      taskId = id;
    }
    return this.dialogRef.componentInstance.formSubmit.subscribe((formData) => {
      event === 'CREATE'
        ? this.addNewTask(formData)
        : this.editTask(taskId, formData);
    });
  }
}
