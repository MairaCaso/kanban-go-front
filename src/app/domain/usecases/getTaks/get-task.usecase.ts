import { Observable } from 'rxjs';
import { TaskGateway } from '../../models/task/gateway/task.gateway';
import { ResponseTask } from '@domain/models/general/response/response.model';

export class GetTasksUseCases {
  constructor(private _taskGateway: TaskGateway) {}
  getTaskById(id: string): Observable<ResponseTask> {
    return this._taskGateway.getById(id);
  }
  getAllTask(): Observable<ResponseTask[]> {
    return this._taskGateway.getAll();
  }
}
