import { Task } from '../../task/task.model';

export interface Column {
  title: string;
  tasks: Task[];
  id?: string; // Optional property for unique identification
}
