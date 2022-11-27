import {ExamAttemptGateway} from '../gateways/ExamAttemptGateway';
import {
  ExamAttemptCreateDTO,
  ExamAttemptDTO,
  ExamAttemptList,
  ExamAttemptUpdateDTO,
} from '../models/admin/ExamAttempt';
import {SortDirection} from '../models/Common';

export class ExamAttemptService {
  private examAttemptGateway: ExamAttemptGateway;

  constructor(options: {examAttemptGateway: ExamAttemptGateway}) {
    this.examAttemptGateway = options.examAttemptGateway;
  }

  public async createExamAttempt(
    body: ExamAttemptCreateDTO,
  ): Promise<ExamAttemptDTO> {
    return this.examAttemptGateway.createExamAttempt(body);
  }

  public async getExamAttempts(
    searchStr: string,
    sortDirection: SortDirection,
    pageSize: number,
    pageNo: number,
  ): Promise<ExamAttemptList> {
    return await this.examAttemptGateway.getExamAttempts(
      searchStr,
      sortDirection,
      pageSize,
      pageNo,
    );
  }

  public async updateExamAttempt(
    id: string,
    body: ExamAttemptUpdateDTO,
  ): Promise<void> {
    await this.examAttemptGateway.updateExamAttempt(id, body);
  }

  public async getExamAttempt(id: string): Promise<void> {
    return this.examAttemptGateway.getExamAttempt(id);
  }

  public async deleteExamAttempt(id: string): Promise<void> {
    await this.examAttemptGateway.deleteExamAttempt(id);
  }

  public async submitExamAttempt(id: string): Promise<void> {
    await this.examAttemptGateway.submitExamAttempt(id);
  }

  public async reviewExamAttempt(id: string): Promise<void> {
    await this.examAttemptGateway.reviewExamAttempt(id);
  }
}
