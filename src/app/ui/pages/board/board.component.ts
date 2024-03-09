import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Column } from 'src/app/domain/models/general/column/column.model';
import { MatIconModule } from '@angular/material/icon';
import { Task } from 'src/app/domain/models/task/task.model';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { TaskGateway } from 'src/app/domain/models/task/gateway/task.gateway';
import { TaskService } from 'src/app/infrastructure/driven-adapters/task/task.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, Subscription, of } from 'rxjs';
import { ResponseTask } from '@domain/models/general/response/response.model';
import { TaskDTO } from '@domain/models/task/task-DTO.model';
import { Status } from '@core/enums/status.enum';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    TaskCardComponent,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [{ provide: TaskGateway, useClass: TaskService }],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  @ViewChild('taskCardComponent') taskCardComponent!: TaskCardComponent;
  dialogRef!: MatDialogRef<TaskCardComponent>;

  tasks: ResponseTask[] = [];
  tasks$: Observable<ResponseTask[]> = of([]);

  subscription$!: Subscription;

  constructor(public dialog: MatDialog, private _taskGateway: TaskGateway) {}
  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask(): void {
    this.tasks$ = this._taskGateway.getAll();
  }

  addNewTask(task: TaskDTO) {
    console.log(213123123);
    this._taskGateway.create(task).subscribe({
      next: () => {
        this.getAllTask();
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  deleteTask(id: string) {
    this._taskGateway.delete(id).subscribe({
      next: () => {
        this.getAllTask();
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  editTask(id: string, task: TaskDTO) {
    this._taskGateway.update(id, task).subscribe({
      next: () => {
        this.getAllTask();
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  openTaskModal(event: string, task?: Task) {
    this.dialogRef = this.dialog.open(TaskCardComponent, {
      height: '355px',
      width: '400px',
    });

    this.dialogRef.afterOpened().subscribe((result) => {
      if (event === 'UPDATE' && task) {
        this.dialogRef.componentInstance.modalTitle = 'Editar';
        this.dialogRef.componentInstance.taskForm.setValue({
          title: task.title,
          description: task.description,
          status: task.status,
        });
        this.onSaveTask(event, task._id);
      } else {
        this.dialogRef.componentInstance.modalTitle = 'Crear';
        this.onSaveTask(event);
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
