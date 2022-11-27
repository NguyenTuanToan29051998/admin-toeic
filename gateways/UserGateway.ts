import {AxiosInstance} from 'axios';
import {UserListDTO} from '../models/admin/User';

export class UserGateway {
  private restConnector: AxiosInstance;

  constructor(options: {restConnector: AxiosInstance}) {
    this.restConnector = options.restConnector;
  }

  public async getUser(pageSize: number, pageNo: number): Promise<UserListDTO> {
    const {data} = await this.restConnector.get(
      `/users?pageSize=${pageSize}&pageNo=${pageNo}`,
    );
    return data;
  }
}
