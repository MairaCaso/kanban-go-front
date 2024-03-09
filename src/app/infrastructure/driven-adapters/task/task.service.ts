import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseTask } from '@domain/models/general/response/response.model';
import { TaskDTO } from '@domain/models/task/task-DTO.model';
import { Observable } from 'rxjs';
import { TaskGateway } from 'src/app/domain/models/task/gateway/task.gateway';
import { Task } from 'src/app/domain/models/task/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends TaskGateway {
  url: string = 'http://localhost:4000/api/task';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getById(id: string): Observable<ResponseTask> {
    return this.httpClient.get<ResponseTask>(`${this.url}/${id}`);
  }
  getAll(): Observable<ResponseTask[]> {
    return this.httpClient.get<ResponseTask[]>(this.url);
  }
  create(task: TaskDTO): Observable<ResponseTask> {
    return this.httpClient.post<ResponseTask>(this.url, task);
  }
  update(id: string, task: TaskDTO): Observable<ResponseTask> {
    return this.httpClient.put<ResponseTask>(`${this.url}/${id}`, task);
  }
  delete(id: string): Observable<any> {
    return this.httpClient.delete<Task>(`${this.url}/${id}`);
  }
}
