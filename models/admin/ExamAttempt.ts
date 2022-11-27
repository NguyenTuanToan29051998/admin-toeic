import {AnswerDTO, QuestionDTO} from './Question';
import {UserDTO} from './User';
import {ExamExecutionDTO} from './ExamExecution';

export interface ExamAttemptCreateDTO {
  tryNumber: number;
  startTime: string;
  user: {
    id: string;
  };
  examExecution: {
    id: string;
  };
}

export interface ExamAttemptUpdateDTO {
  score: number;
  startTime: string;
  endTime: string;
}

export interface ExamAttemptDetailCreateDTO {
  examAttempt: {
    id: string;
  };
  question: {
    id: string;
  };
  answer: {
    id: string;
  };
}

export interface ExamAttemptDetailUpdateDTO {
  answer: {
    id: string;
  };
}

export interface ExamAttemptDetailDTO {
  id: string;
  examAttempt: ExamAttemptDTO;
  question: QuestionDTO;
  answer: AnswerDTO;
  isCorrect: boolean;
  point: number;
  explanation?: string;
}

export interface ExamAttemptDTO {
  id: string;
  tryNumber: number;
  score: number;
  startTime: string;
  endTime: string;
  user: UserDTO;
  examExecution: ExamExecutionDTO;
  answers: ExamAttemptDetailDTO;
}

export interface ExamAttemptList {
  totalRecords: number;
  totalPages: number;
  pageNo: number;
  pageSize: number;
  data: ExamAttemptDTO[];
}

export interface ExamAttemptDetailList {
  totalRecords: number;
  totalPages: number;
  pageNo: number;
  pageSize: number;
  data: ExamAttemptDetailDTO[];
}
