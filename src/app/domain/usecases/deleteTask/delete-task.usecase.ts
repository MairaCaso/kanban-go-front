import { Observable } from 'rxjs';
import { TaskGateway } from '../../models/task/gateway/task.gateway';

export abstract class DeleteTaskUseCase {
  constructor(private _taskGateway: TaskGateway) {}

  deleteTask(id: string): Observable<{ msg: string }> {
    return this._taskGateway.delete(id);
  }
}
