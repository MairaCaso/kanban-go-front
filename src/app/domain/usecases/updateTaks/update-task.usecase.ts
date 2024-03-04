import { TaskGateway } from '../../models/task/gateway/task.gateway';
import { Task } from '../../models/task/task.model';

export abstract class UpdateTaskUseCase {
  constructor(private _taskGateway: TaskGateway) {}

  updateTask(id: string, task: Task) {
    this._taskGateway.update(id, task);
  }
}
