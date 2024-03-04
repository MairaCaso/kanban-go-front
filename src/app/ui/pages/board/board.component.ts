import { Component, ElementRef, ViewChild } from '@angular/core';
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
export class BoardComponent {
  @ViewChild('taskCardComponent') taskCardComponent!: TaskCardComponent;
  dialogRef!: MatDialogRef<TaskCardComponent>;

  columns: Column[] = [
    {
      title: 'To Do',
      tasks: [
        {
          _id: 1,
          title: 'Tarea 1',
          description: 'Descripción de la tarea 1',
        },
        {
          _id: 2,
          title: 'Tarea 2',
          description: 'Descripción de la tarea 2',
        },
      ],
    },
    {
      title: 'In Progress',
      tasks: [
        {
          _id: 3,
          title: 'Tarea 3',
          description: 'Descripción de la tarea 3',
        },
      ],
    },
    {
      title: 'Done',
      tasks: [
        {
          _id: 4,
          title: 'Tarea 4',
          description: 'Descripción de la tarea 4',
        },
      ],
    },
  ];

  constructor(private dialog: MatDialog, private _taskGateway: TaskGateway) {}

  addNewTask(column: Column) {
    const newTask: Task = {
      _id: 5,
      title: 'Nueva tarea',
      description: 'Descripción de la nueva tarea',
    };
    column.tasks.push(newTask);
  }

  deleteTask(column: Column, task: Task) {
    const taskIndex = column.tasks.indexOf(task);
    if (taskIndex !== -1) {
      column.tasks.splice(taskIndex, 1);
    }
  }

  editTask(column: Column, task: Task) {
    console.log('edit');
  }

  openTaskModal(
    isUpdateModal: boolean,
    column: Column | null,
    task: Task | null
  ) {
    console.log(this.taskCardComponent);
    this.dialogRef = this.dialog.open(TaskCardComponent, {
      height: '400px',
      width: '400px',
      data: {
        modalTitle: 'hola',
        title: !isUpdateModal ? '' : task?.title,
        description: !isUpdateModal ? '' : task?.description,
      },
    });
  }
}
