import {TagGateway} from '../gateways/TagGateWay';
import {TagCreateDTO, TagDTO, TagList, TagType} from '../models/admin/Tag';
import {SortDirection} from '../models/Common';

export class TagService {
  private tagGateway: TagGateway;

  constructor(options: {tagGateway: TagGateway}) {
    this.tagGateway = options.tagGateway;
  }

  public async createTag(body: TagCreateDTO): Promise<TagDTO> {
    return this.tagGateway.createTag(body);
  }

  public async getTag(
    searchStr: string,
    sortDirection: SortDirection,
    pageNo: number,
    pageSize: number,
    status: TagType,
  ): Promise<TagList> {
    return this.tagGateway.getTag(
      searchStr,
      sortDirection,
      pageNo,
      pageSize,
      status,
    );
  }
}
