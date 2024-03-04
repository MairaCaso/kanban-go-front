import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserGateway } from 'src/app/domain/models/user/gateway/user.gateway';
import { User } from '../../../domain/models/user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UserGateway {
  url: string = 'localhost:4000/api/auth/singin';

  constructor(private httpClient: HttpClient) {
    super();
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, user);
  }
}
