import {TagDTO} from './Tag';

export enum QuestionType {
  SINGLE_CHOICE = 'singleChoice',
  MULTIPLE_CHOICES = 'multipleChoices',
  TOEIC = 'TOEIC',
}

export enum AssetType {
  IMAGE = 'Image',
  VIDEO = 'Video',
  AUDIO = 'Audio',
  DOCUMENT = 'Document',
  UNKNOWN = 'Unknown',
}
export enum AssetStatus {
  PENDING = 'Pending',
  DELETING = 'Deleting',
  OK = 'Ok',
}

export interface IsReviewedDTO {
  isReviewed: boolean;
}

export interface AnswerDTO {
  id: string;
  title: string;
  isCorrect: boolean;
  priority: number;
  additional: object;
  explaination: string;
  media: AnswerAssetDTO[];
}

export interface AnswerAssetDTO {
  priority: number;
  answer: AnswerDTO;
  asset: AssetDTO;
}

export interface AssetDTO {
  id: string;
  type: AssetType;
  extension: string;
  uri: string;
  status: AssetStatus;
}

export interface QuestionAssetDTO {
  priority: number;
  question: QuestionDTO;
  asset: AssetDTO;
}

export interface QuestionDTO {
  id: string;
  title: string;
  type: QuestionType;
  priority: number;
  additional?: object;
  hint?: string;
  explaination?: string;
  answers: AnswerDTO[];
  media: QuestionAssetDTO[];
  isReviewed: boolean;
  children: object;
  tags: TagDTO[];
}

export interface QuestionCreateDTO {
  title: string;
  type: QuestionType;
  priority: number;
  answers: {
    title: string;
    isCorrect: boolean;
    priority: number;
  }[];
}

export interface QuestionList {
  totalRecords: number;
  totalPages: number;
  pageNo: number;
  pageSize: number;
  data: QuestionDTO[];
}

export interface AssetList {
  totalRecords: number;
  totalPages: number;
  pageNo: number;
  pageSize: number;
  data: AssetDTO[];
}
