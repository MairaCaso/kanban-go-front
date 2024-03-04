import { Observable } from 'rxjs';
import { User } from '../user.model';

export abstract class UserGateway {
  abstract create(user: User): Observable<User>;
}
