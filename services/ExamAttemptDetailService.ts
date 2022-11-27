import {ExamAttemptDetailGateway} from '../gateways/ExamAttemptDetailGateway';
import {
  ExamAttemptDetailCreateDTO,
  ExamAttemptDetailDTO,
  ExamAttemptDetailList,
  ExamAttemptDetailUpdateDTO,
} from '../models/admin/ExamAttempt';

export class ExamAttemptDetailService {
  private examAttemptDetailGateway: ExamAttemptDetailGateway;

  constructor(options: {examAttemptDetailGateway: ExamAttemptDetailGateway}) {
    this.examAttemptDetailGateway = options.examAttemptDetailGateway;
  }

  public async createExamAttemptDetail(
    body: ExamAttemptDetailCreateDTO,
  ): Promise<ExamAttemptDetailDTO> {
    return this.examAttemptDetailGateway.createExamAttemptDetail(body);
  }

  public async getExamAttemptDetails(
    pageSize: number,
    pageNo: number,
  ): Promise<ExamAttemptDetailList> {
    return this.examAttemptDetailGateway.getExamAttemptDetails(
      pageSize,
      pageNo,
    );
  }

  public async updateExamAttemptDetail(
    id: string,
    body: ExamAttemptDetailUpdateDTO,
  ): Promise<void> {
    await this.examAttemptDetailGateway.updateExamAttemptDetail(id, body);
  }

  public async getExamAttemptDetail(id: string): Promise<ExamAttemptDetailDTO> {
    return this.examAttemptDetailGateway.getExamAttemptDetail(id);
  }

  public async deleteExamAttemptDetail(id: string): Promise<void> {
    await this.examAttemptDetailGateway.deleteExamAttemptDetail(id);
  }
}
