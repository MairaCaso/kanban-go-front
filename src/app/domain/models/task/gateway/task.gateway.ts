import { Observable } from 'rxjs';
import { Task } from '../task.model';
import { TaskDTO } from '../task-DTO.model';

export abstract class TaskGateway {
  abstract getById(id: string): Observable<Task>;
  abstract getAll(): Observable<Array<Task>>;
  abstract create(task: TaskDTO): Observable<Task>;
  abstract update(id: string, task: Task): Observable<Task>;
  abstract delete(id: string): Observable<{ success: string; msg: string }>;
}
