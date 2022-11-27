import {AxiosInstance} from 'axios';

import {SortDirection} from '../models/Common';
import {
  CollectionAddQuestionDTO,
  CollectionCreateDTO,
  CollectionDTO,
  CollectionList,
  CollectionStatus,
  UpdateQuestionInCollectionDTO,
} from '../models/admin/Collection';

export class CollectionGateway {
  private restConnector: AxiosInstance;

  constructor(options: {restConnector: AxiosInstance}) {
    this.restConnector = options.restConnector;
  }

  public async createCollection(
    body: CollectionCreateDTO,
  ): Promise<CollectionDTO> {
    const {data} = await this.restConnector.post(`/collections`, body);
    return data;
  }

  public async getCollection(
    searchStr: string,
    sortDirection: SortDirection,
    pageNo: number,
    pageSize: number,
    status: CollectionStatus,
  ): Promise<CollectionList> {
    const {data} = await this.restConnector.get(
      `/collections?searchStr=${searchStr}&sortDirection=${sortDirection}&pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`,
    );
    return data;
  }

  public async updateCollection(
    id: string,
    body: CollectionCreateDTO,
  ): Promise<CollectionDTO> {
    const {data} = await this.restConnector.put(`/collections/${id}`, body);
    return data;
  }

  public async getCollectionById(id: string): Promise<CollectionDTO> {
    const {data} = await this.restConnector.get(`/collections/${id}`);
    return data;
  }

  public async deleteCollection(id: string): Promise<void> {
    await this.restConnector.delete(`/collections/${id}`);
  }

  public async addQuestionToCollection(
    id: string,
    body: CollectionAddQuestionDTO,
  ): Promise<CollectionDTO> {
    const {data} = await this.restConnector.post(
      `/collections/${id}/questions`,
      body,
    );
    return data;
  }

  public async submitCollection(id: string): Promise<CollectionDTO> {
    const {data} = await this.restConnector.patch(
      `/collections/${id}/submitted`,
    );
    return data;
  }

  public async reviewCollection(id: string): Promise<CollectionDTO> {
    const {data} = await this.restConnector.patch(
      `/collections/${id}/reviewed`,
    );
    return data;
  }

  public async updateQuestionInCollection(
    id: string,
    questionId: string,
    body: UpdateQuestionInCollectionDTO,
  ): Promise<void> {
    const {data} = await this.restConnector.put(
      `/collections/${id}/questions/${questionId}`,
      body,
    );
    return data;
  }

  public async removeQuestInCollection(
    id: string,
    questionId: string,
  ): Promise<void> {
    await this.restConnector.delete(
      `/collections/${id}/questions/${questionId}`,
    );
  }
}
