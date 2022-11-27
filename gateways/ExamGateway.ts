import {AxiosInstance} from 'axios';
import {
  AddQuestionToExam,
  ExamDTO,
  ExamList,
  ExamQuestionDTO,
  UpdateQuestionInExam,
} from '../models/admin/Exam';
import {SortDirection} from '../models/Common';

export class ExamGateway {
  private restConnector: AxiosInstance;

  constructor(options: {restConnector: AxiosInstance}) {
    this.restConnector = options.restConnector;
  }

  public async createExams(body: ExamDTO): Promise<ExamDTO> {
    const {data} = await this.restConnector.post(`/exams`, body);
    return data;
  }

  public async getExams(
    searchStr: string,
    sortDirection: SortDirection,
    pageNo: number,
    pageSize: number,
  ): Promise<ExamList> {
    const {data} = await this.restConnector.get(
      `/exams?searchStr=${searchStr}&sortDirection=${sortDirection}&pageNo=${pageNo}&pageSize=${pageSize}`,
    );
    return data;
  }

  public async updateExams(id: string, body: ExamDTO): Promise<ExamDTO> {
    const {data} = await this.restConnector.put(`/exams/${id}`, body);
    return data;
  }

  public async getExam(id: string): Promise<ExamDTO> {
    const {data} = await this.restConnector.get(`/exams/${id}`);
    return data;
  }

  public async deleteExam(id: string): Promise<void> {
    await this.restConnector.delete(`/exams/${id}`);
  }

  //TODO check data response
  public async getQuestionsInExam(id: string): Promise<ExamQuestionDTO> {
    const {data} = await this.restConnector.get(`/exams/${id}/questions`);
    return data;
  }

  public async addQuestionToExam(
    id: string,
    body: AddQuestionToExam,
  ): Promise<ExamQuestionDTO> {
    const {data} = await this.restConnector.post(
      `/exams/${id}/questions`,
      body,
    );
    return data;
  }

  public async submitExam(id: string): Promise<ExamQuestionDTO> {
    const {data} = await this.restConnector.patch(`/exams/${id}/submitted`);
    return data;
  }

  public async reviewExam(id: string): Promise<ExamQuestionDTO> {
    const {data} = await this.restConnector.patch(`/exams/${id}/reviewed`);
    return data;
  }

  public async updateQuestionInExam(
    id: string,
    questionId: string,
    body: UpdateQuestionInExam,
  ): Promise<void> {
    const {data} = await this.restConnector.put(
      `/exams/${id}/questions/${questionId}`,
      body,
    );
    return data;
  }

  public async removeQuestInExam(
    id: string,
    questionId: string,
  ): Promise<void> {
    await this.restConnector.delete(`/exams/${id}/questions/${questionId}`);
  }
}
