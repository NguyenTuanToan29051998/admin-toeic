import {QuestionDTO} from './Question';

export enum CollectionStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  REVIEWED = 'reviewed',
}

export interface UpdateQuestionInCollectionDTO {
  priority: number;
  point: number;
  level: string;
}

export interface CollectionAddQuestionDTO {
  priority: number;
  point: number;
  level: string;
  question: {
    id: string;
  };
}

export interface CollectionCreateDTO {
  title: string;
  description: string;
  avatar: string;
}

export interface CollectionQuestionDTO {
  priority: number;
  point: number;
  level: string;
  question: QuestionDTO;
}

export interface CollectionDTO {
  id: string;
  title: string;
  description: string;
  avatar: string;
  status: CollectionStatus;
  questions: CollectionQuestionDTO[];
}

export interface CollectionList {
  totalRecords: number;
  totalPages: number;
  pageNo: number;
  pageSize: number;
  data: CollectionDTO[];
}
