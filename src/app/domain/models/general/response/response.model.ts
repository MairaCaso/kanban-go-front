import { Status } from '@core/enums/status.enum';

export interface ResponseSingIn {
  success: boolean;
  message: string;
  token: string;
}

export interface ResponseLogin {
  access_token: string;
  refresh_token: string;
}

export interface ResponseTask {
  _id: string;
  title: string;
  description: string;
  creationDate: Date;
  status: Status;
  __v: number;
}
