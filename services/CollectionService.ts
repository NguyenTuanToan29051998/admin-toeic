import {CollectionGateway} from '../gateways/CollectionGateway';
import {
  CollectionAddQuestionDTO,
  CollectionCreateDTO,
  CollectionDTO,
  CollectionList,
  CollectionStatus,
  UpdateQuestionInCollectionDTO,
} from '../models/admin/Collection';
import {SortDirection} from '../models/Common';

export class CollectionService {
  private collectionGateway: CollectionGateway;

  constructor(options: {collectionGateway: CollectionGateway}) {
    this.collectionGateway = options.collectionGateway;
  }

  public async createCollection(
    body: CollectionCreateDTO,
  ): Promise<CollectionDTO> {
    return this.collectionGateway.createCollection(body);
  }

  public async getCollection(
    searchStr: string,
    sortDirection: SortDirection,
    pageNo: number,
    pageSize: number,
    status: CollectionStatus,
  ): Promise<CollectionList> {
    return this.collectionGateway.getCollection(
      searchStr,
      sortDirection,
      pageNo,
      pageSize,
      status,
    );
  }

  public async updateCollection(
    id: string,
    body: CollectionCreateDTO,
  ): Promise<CollectionDTO> {
    return this.collectionGateway.updateCollection(id, body);
  }

  public async getCollectionById(id: string): Promise<CollectionDTO> {
    return this.collectionGateway.getCollectionById(id);
  }

  public async deleteCollection(id: string): Promise<void> {
    await this.collectionGateway.deleteCollection(id);
  }

  public async addQuestionToCollection(
    id: string,
    body: CollectionAddQuestionDTO,
  ): Promise<CollectionDTO> {
    return this.collectionGateway.addQuestionToCollection(id, body);
  }

  public async submitCollection(id: string): Promise<CollectionDTO> {
    return this.collectionGateway.submitCollection(id);
  }

  public async reviewCollection(id: string): Promise<CollectionDTO> {
    return this.collectionGateway.reviewCollection(id);
  }

  public async updateQuestionInCollection(
    id: string,
    questionId: string,
    body: UpdateQuestionInCollectionDTO,
  ): Promise<void> {
    return this.collectionGateway.updateQuestionInCollection(
      id,
      questionId,
      body,
    );
  }

  public async removeQuestInCollection(
    id: string,
    questionId: string,
  ): Promise<void> {
    await this.collectionGateway.removeQuestInCollection(id, questionId);
  }
}
