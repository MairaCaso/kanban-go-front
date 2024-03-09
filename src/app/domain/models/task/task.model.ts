import { Status } from '@core/enums/status.enum';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: Status;
}
