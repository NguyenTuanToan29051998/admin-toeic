import {ExamExecutionGateway} from '../gateways/ExamExecutionGateway';
import {
  ExamExecutionDTO,
  ExamExecutionList,
  ExamExecutionUpdateDTO,
} from '../models/admin/ExamExecution';
import {SortDirection} from '../models/Common';

export class ExamExecutionService {
  private examExecutionGateway: ExamExecutionGateway;

  constructor(options: {examExecutionGateway: ExamExecutionGateway}) {
    this.examExecutionGateway = options.examExecutionGateway;
  }

  public async createExamExecution(
    body: ExamExecutionDTO,
  ): Promise<ExamExecutionDTO> {
    return this.examExecutionGateway.createExamExecution(body);
  }

  public async getExamExecutions(
    searchStr: string,
    sortDirection: SortDirection,
    pageSize: number,
    pageNo: number,
  ): Promise<ExamExecutionList> {
    return this.examExecutionGateway.getExamExecutions(
      searchStr,
      sortDirection,
      pageSize,
      pageNo,
    );
  }

  public async updateExamExecution(
    id: string,
    body: ExamExecutionUpdateDTO,
  ): Promise<void> {
    await this.examExecutionGateway.updateExamExecution(id, body);
  }

  public async getExamExecution(id: string): Promise<ExamExecutionDTO> {
    return this.examExecutionGateway.getExamExecution(id);
  }

  public async deleteExamExecution(id: string): Promise<void> {
    await this.examExecutionGateway.deleteExamExecution(id);
  }
}
