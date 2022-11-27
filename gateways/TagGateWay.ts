import {AxiosInstance} from 'axios';
import {TagCreateDTO, TagDTO, TagList, TagType} from '../models/admin/Tag';
import {SortDirection} from '../models/Common';

export class TagGateway {
  private restConnector: AxiosInstance;

  constructor(options: {restConnector: AxiosInstance}) {
    this.restConnector = options.restConnector;
  }

  public async createTag(body: TagCreateDTO): Promise<TagDTO> {
    const {data} = await this.restConnector.post(`/tags`, body);
    return data;
  }

  public async getTag(
    searchStr: string,
    sortDirection: SortDirection,
    pageNo: number,
    pageSize: number,
    status: TagType,
  ): Promise<TagList> {
    const {data} = await this.restConnector.get(
      `/tags?searchStr=${searchStr}&sortDirection=${sortDirection}&pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`,
    );
    return data;
  }
}
