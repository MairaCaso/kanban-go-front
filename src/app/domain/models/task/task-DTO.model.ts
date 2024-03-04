import { Task } from './task.model';

export interface TaskDTO extends Omit<Task, '_id'> {}
