import {AuthGateway} from '../gateways/AuthGateway';
import {UserDTO} from '../models/admin/User';

export class AuthService {
  private authGateway: AuthGateway;

  constructor(options: {authGateway: AuthGateway}) {
    this.authGateway = options.authGateway;
  }

  public async login(body: {
    email: string;
    password: string;
  }): Promise<UserDTO> {
    const {token} = await this.authGateway.login(body);
    this.authGateway.setAccessToken(token);
    return this.getLoginUser();
  }

  public async logout(): Promise<void> {
    return this.authGateway.logout();
  }

  public async getLoginUser(): Promise<UserDTO | null> {
    return this.authGateway.getLoginUser();
  }

  public async setAccessToken(token: string): Promise<void> {
    return this.authGateway.setAccessToken(token);
  }
}
