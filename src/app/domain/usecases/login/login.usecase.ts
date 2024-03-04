export abstract class LoginUseCase {
  constructor(private _loginGateway: LoginUseCase) {}

  login(email: string, password: string) {
    this._loginGateway.login(email, password);
  }
}
