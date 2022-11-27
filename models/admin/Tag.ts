export enum TagType {
  QUESTION = 'Question',
  EXAM = 'Exam',
  COLLECTION = 'Collection',
}

export interface TagDTO {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: TagType;
}

export interface TagCreateDTO {
  name: string;
  description: string;
  type: TagType;
}

export interface TagList {
  totalRecords: number;
  totalPage: number;
  pageNo: number;
  pageSize: number;
  data: TagDTO[];
}
