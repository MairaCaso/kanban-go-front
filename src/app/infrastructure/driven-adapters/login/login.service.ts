import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginGateway } from 'src/app/domain/models/login/gateway/login.gateway';
import { Login } from 'src/app/domain/models/login/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends LoginGateway {
  url: string = 'localhost:4000/api/auth/login';

  constructor(private httpClient: HttpClient) {
    super();
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<Login>(this.url, {
      email,
      password,
    });
  }
}
