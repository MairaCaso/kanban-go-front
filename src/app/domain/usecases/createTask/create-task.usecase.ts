import { TaskGateway } from '../../models/task/gateway/task.gateway';
import { Task } from '../../models/task/task.model';

export abstract class CreateTaskUseCase {
  constructor(private _taskGateway: TaskGateway) {}

  createTask(task: Task) {
    this._taskGateway.create(task);
  }
}
