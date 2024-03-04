import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskGateway } from 'src/app/domain/models/task/gateway/task.gateway';
import { Task } from 'src/app/domain/models/task/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends TaskGateway {
  url: string = 'localhost:4000/api/task';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getById(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.url}/${id}`);
  }
  getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url);
  }
  create(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.url, task);
  }

  update(id: string, task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.url}/${id}`, task);
  }
  delete(id: string): Observable<any> {
    return this.httpClient.delete<Task>(`${this.url}/${id}`);
  }
}
