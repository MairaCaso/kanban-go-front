import { Observable } from 'rxjs';
import { TaskDTO } from '../task-DTO.model';
import { ResponseTask } from '@domain/models/general/response/response.model';

export abstract class TaskGateway {
  abstract getById(id: string): Observable<ResponseTask>;
  abstract getAll(): Observable<Array<ResponseTask>>;
  abstract create(task: TaskDTO): Observable<ResponseTask>;
  abstract update(id: string, task: TaskDTO): Observable<ResponseTask>;
  abstract delete(id: string): Observable<{ msg: string }>;
}
