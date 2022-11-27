import {QuestionDTO} from './Question';
import {ExamStructureDTO} from './ExamStructure';

export enum ExamQuestionLvl {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export interface ExamQuestionDTO {
  id: string;
  priority: number;
  point: number;
  level: ExamQuestionLvl;
  question: QuestionDTO;
  exam: ExamDTO;
}

export interface AddQuestionToExam {
  priority: number;
  point: number;
  level: ExamQuestionLvl;
  question: {id: string};
}

export interface UpdateQuestionInExam {
  priority: number;
  point: number;
  level: ExamQuestionLvl;
}

export interface ExamDTO {
  id: string;
  title: string;
  description: string;
  time: number;
  structure: ExamStructureDTO;
  questions?: ExamQuestionDTO[];
}

export interface ExamList {
  totalRecords: number;
  totalPages: number;
  pageNo: number;
  pageSize: number;
  data: ExamDTO[];
}
