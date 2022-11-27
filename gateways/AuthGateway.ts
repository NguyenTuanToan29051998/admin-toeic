import {AxiosInstance} from 'axios';
import Cookies from 'js-cookie';
import getConfig from 'next/config';
import {UserDTO} from '../models/admin/User';

const AUTHORIZATION_HEADER = 'Authorization';

export const ACCESS_TOKEN_COOKIE = 'jwt';
export const TENANT_ID = 'tnid';

export class AuthGateway {
  private restConnector: AxiosInstance;
  private jwt: string | null;

  constructor(options: {restConnector: AxiosInstance}) {
    this.jwt = null;
    this.restConnector = options.restConnector;
    this.loadAccessToken();
  }

  private loadAccessToken(): void {
    // On browser, load access token from cookie storage.
    const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE);
    this.jwt = accessToken;
    this.restConnector.defaults.headers[
      AUTHORIZATION_HEADER
    ] = `Bearer ${accessToken}`;
    this.restConnector.defaults.headers[
      TENANT_ID
    ] = getConfig().publicRuntimeConfig.TENANT_ID;
  }

  public setAccessToken(token: string | null): void {
    if (token) {
      this.jwt = token;
      Cookies.set(ACCESS_TOKEN_COOKIE, token);
      this.restConnector.defaults.headers[
        AUTHORIZATION_HEADER
      ] = `Bearer ${token}`;
    } else {
      this.jwt = null;
      Cookies.remove(ACCESS_TOKEN_COOKIE);
      delete this.restConnector.defaults.headers[AUTHORIZATION_HEADER];
    }
  }

  public async login(body: {
    email: string;
    password: string;
  }): Promise<{token: string}> {
    const {data} = await this.restConnector.post('/users/login', body);
    return {token: data.accessToken};
  }

  public async logout(): Promise<void> {
    this.setAccessToken(null);
  }

  public async getLoginUser(): Promise<UserDTO | null> {
    if (!this.jwt) {
      return null;
    }

    try {
      const resp = await this.restConnector.get('/users/me');
      return resp.data;
    } catch (e) {
      return null;
    }
  }
}
