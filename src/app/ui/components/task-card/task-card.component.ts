import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Task } from '@domain/models/task/task.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() deleteTask: EventEmitter<any> = new EventEmitter<any>();
  @Output() openTaskModal: EventEmitter<any> = new EventEmitter<{
    action: string;
    task?: Task;
  }>();

  onDeleteTask(id: string) {
    this.deleteTask.emit(id);
  }

  onOpenTaskModal(action: string, task: Task) {
    const data = {
      action,
      task,
    };
    this.openTaskModal.emit(data);
  }
}
