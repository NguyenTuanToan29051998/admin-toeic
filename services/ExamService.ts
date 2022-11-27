import {ExamGateway} from '../gateways/ExamGateway';
import {
  AddQuestionToExam,
  ExamDTO,
  ExamList,
  ExamQuestionDTO,
  UpdateQuestionInExam,
} from '../models/admin/Exam';
import {SortDirection} from '../models/Common';

export class ExamService {
  private examGateway: ExamGateway;

  constructor(options: {examGateway: ExamGateway}) {
    this.examGateway = options.examGateway;
  }

  public async createExams(body: ExamDTO): Promise<ExamDTO> {
    return this.examGateway.createExams(body);
  }

  public async getExams(
    searchStr: string,
    sortDirection: SortDirection,
    pageNo: number,
    pageSize: number,
  ): Promise<ExamList> {
    return this.examGateway.getExams(
      searchStr,
      sortDirection,
      pageSize,
      pageNo,
    );
  }

  public async updateExams(id: string, body: ExamDTO): Promise<ExamDTO> {
    return this.examGateway.updateExams(id, body);
  }

  public async getExam(id: string): Promise<ExamDTO> {
    return this.examGateway.getExam(id);
  }

  public async deleteExam(id: string): Promise<void> {
    await this.examGateway.deleteExam(id);
  }

  //TODO check data response
  public async getQuestionsInExam(id: string): Promise<ExamQuestionDTO> {
    return this.examGateway.getQuestionsInExam(id);
  }

  public async addQuestionToExam(
    id: string,
    body: AddQuestionToExam,
  ): Promise<ExamQuestionDTO> {
    return this.examGateway.addQuestionToExam(id, body);
  }

  public async submitExam(id: string): Promise<ExamQuestionDTO> {
    return this.examGateway.submitExam(id);
  }

  public async reviewExam(id: string): Promise<ExamQuestionDTO> {
    return this.examGateway.reviewExam(id);
  }

  public async updateQuestionInExam(
    id: string,
    questionId: string,
    body: UpdateQuestionInExam,
  ): Promise<void> {
    return this.examGateway.updateQuestionInExam(id, questionId, body);
  }

  public async removeQuestInExam(
    id: string,
    questionId: string,
  ): Promise<void> {
    await this.examGateway.removeQuestInExam(id, questionId);
  }
}
