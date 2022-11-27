import {AxiosInstance} from 'axios';
import {SortDirection} from '../models/Common';
import {
  ExamAttemptCreateDTO,
  ExamAttemptDTO,
  ExamAttemptList,
  ExamAttemptUpdateDTO,
} from '../models/admin/ExamAttempt';
import {ExamQuestionDTO} from '../models/admin/Exam';

export class ExamAttemptGateway {
  private restConnector: AxiosInstance;

  constructor(options: {restConnector: AxiosInstance}) {
    this.restConnector = options.restConnector;
  }

  public async createExamAttempt(
    body: ExamAttemptCreateDTO,
  ): Promise<ExamAttemptDTO> {
    const {data} = await this.restConnector.post(`/exam-attempts`, body);
    return data;
  }

  public async getExamAttempts(
    searchStr: string,
    sortDirection: SortDirection,
    pageSize: number,
    pageNo: number,
  ): Promise<ExamAttemptList> {
    const {data} = await this.restConnector.get(
      `/exam-attempts?searchStr=${searchStr}&sortDirection=${sortDirection}&pageSize=${pageSize}&pageNo=${pageNo}`,
    );
    return data;
  }

  public async updateExamAttempt(
    id: string,
    body: ExamAttemptUpdateDTO,
  ): Promise<void> {
    await this.restConnector.put(`/exam-attempts/${id}`, body);
  }

  public async getExamAttempt(id: string): Promise<void> {
    const {data} = await this.restConnector.get(`/exam-attempts/${id}`);
    return data;
  }

  public async deleteExamAttempt(id: string): Promise<void> {
    await this.restConnector.delete(`/exam-attempts/${id}`);
  }

  public async submitExamAttempt(id: string): Promise<void> {
    await this.restConnector.patch(`/exam-attempts/${id}/submit`);
  }

  public async reviewExamAttempt(id: string): Promise<void> {
    await this.restConnector.patch(`/exam-attempts/${id}/review`);
  }
}
