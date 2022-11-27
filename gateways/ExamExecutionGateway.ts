import {AxiosInstance} from 'axios';
import {
  ExamExecutionDTO,
  ExamExecutionList,
  ExamExecutionUpdateDTO,
} from '../models/admin/ExamExecution';
import {SortDirection} from '../models/Common';

export class ExamExecutionGateway {
  private restConnector: AxiosInstance;

  constructor(options: {restConnector: AxiosInstance}) {
    this.restConnector = options.restConnector;
  }

  public async createExamExecution(
    body: ExamExecutionDTO,
  ): Promise<ExamExecutionDTO> {
    const {data} = await this.restConnector.post(`/exam-executions`, body);
    return data;
  }

  public async getExamExecutions(
    searchStr: string,
    sortDirection: SortDirection,
    pageSize: number,
    pageNo: number,
  ): Promise<ExamExecutionList> {
    const {data} = await this.restConnector.get(
      `/exam-executions?searchStr=${searchStr}&sortDirection=${sortDirection}&pageSize=${pageSize}&pageNo=${pageNo}`,
    );
    return data;
  }

  public async updateExamExecution(
    id: string,
    body: ExamExecutionUpdateDTO,
  ): Promise<void> {
    await this.restConnector.put(`/exam-executions/${id}`, body);
  }

  public async getExamExecution(id: string): Promise<ExamExecutionDTO> {
    const {data} = await this.restConnector.get(`/exam-executions/${id}`);
    return data;
  }

  public async deleteExamExecution(id: string): Promise<void> {
    await this.restConnector.delete(`/exam-executions/${id}`);
  }
}
