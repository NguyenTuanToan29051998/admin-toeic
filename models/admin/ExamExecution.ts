import {ExamDTO} from './Exam';
import {ExamAttemptDTO} from './ExamAttempt';

export interface ExamExecutionUpdateDTO {
  title: string;
  description: string;
  status: string; // default Private
  icon: string;
  time: number;
  numberOfQuestions: number;
  maxTry: number;
  maxStop: number;
  passScore: number;
  maxScore: number;
  isPassed: boolean;
  isPrintable: boolean;
  isHideQuestions: boolean;
}

export interface ExamExecutionDTO {
  id: string;
  exam: ExamDTO;
  examAttempts?: ExamAttemptDTO;
  title: string;
  description?: string;
  status?: string;
  icon?: string;
  time?: number;
  numberOfQuestions?: number;
  maxTry?: number;
  maxStop?: number;
  passScore?: number;
  maxScore?: number;
  isPassed?: boolean;
  isPrintable?: boolean;
  isHideQuestions?: boolean;
}

export interface ExamExecutionList {
  totalRecords: number;
  totalPages: number;
  pageNo: number;
  pageSize: number;
  data: ExamExecutionDTO[];
}
