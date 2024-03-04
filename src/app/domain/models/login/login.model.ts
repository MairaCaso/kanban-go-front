import { User } from '../user/user.model';

export interface Login extends Pick<User, 'email' | 'password'> {}
