import { Observable } from 'rxjs';
import { TaskGateway } from '../../models/task/gateway/task.gateway';
import { Task } from '../../models/task/task.model';

export class GetAlbumUseCases {
  constructor(private _taskGateway: TaskGateway) {}
  getTaskById(id: string): Observable<Task> {
    return this._taskGateway.getById(id);
  }
  getAllTask(): Observable<Array<Task>> {
    return this._taskGateway.getAll();
  }
}
