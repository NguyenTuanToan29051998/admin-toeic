import {ExamSectionDTO} from './ExamSection';

export interface ExamStructureDTO {
  id: string;
  title: string;
  description: string;
  numberOfQuestions: number;
  examSections: ExamSectionDTO[];
}

export interface ExamStructure {
  totalRecords: number;
  totalPages: number;
  pageNo: number;
  pageSize: number;
  data: ExamStructureDTO[];
}
