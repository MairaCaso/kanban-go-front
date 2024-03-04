import { UserGateway } from '../../models/user/gateway/user.gateway';
import { User } from '../../models/user/user.model';

export abstract class CreateUserUseCase {
  constructor(private _userGateway: UserGateway) {}

  createUser(user: User) {
    this._userGateway.create(user);
  }
}
