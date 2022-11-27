import {AxiosInstance} from 'axios';
import {
  ExamAttemptDetailCreateDTO,
  ExamAttemptDetailDTO,
  ExamAttemptDetailList,
  ExamAttemptDetailUpdateDTO,
} from '../models/admin/ExamAttempt';

export class ExamAttemptDetailGateway {
  private restConnector: AxiosInstance;

  constructor(options: {restConnector: AxiosInstance}) {
    this.restConnector = options.restConnector;
  }

  public async createExamAttemptDetail(
    body: ExamAttemptDetailCreateDTO,
  ): Promise<ExamAttemptDetailDTO> {
    const {data} = await this.restConnector.post(`/exam-attempt-details`, body);
    return data;
  }

  public async getExamAttemptDetails(
    pageSize: number,
    pageNo: number,
  ): Promise<ExamAttemptDetailList> {
    const {data} = await this.restConnector.get(
      `/exam-attempt-details?pageSize=${pageSize}&pageNo=${pageNo}`,
    );
    return data;
  }

  public async updateExamAttemptDetail(
    id: string,
    body: ExamAttemptDetailUpdateDTO,
  ): Promise<void> {
    await this.restConnector.put(`/exam-attempt-details/${id}`, body);
  }

  public async getExamAttemptDetail(id: string): Promise<ExamAttemptDetailDTO> {
    const {data} = await this.restConnector.get(`/exam-attempt-details/${id}`);
    return data;
  }

  public async deleteExamAttemptDetail(id: string): Promise<void> {
    await this.restConnector.delete(`/exam-attempt-details/${id}`);
  }
}
