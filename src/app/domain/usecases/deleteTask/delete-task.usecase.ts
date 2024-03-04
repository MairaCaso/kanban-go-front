import { TaskGateway } from '../../models/task/gateway/task.gateway';
import { Task } from '../../models/task/task.model';

export abstract class DeleteTaskUseCase {
  constructor(private _taskGateway: TaskGateway) {}

  deleteTask(id: string) {
    this._taskGateway.delete(id);
  }
}
