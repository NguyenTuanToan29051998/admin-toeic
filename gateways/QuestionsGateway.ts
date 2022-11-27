import {AxiosInstance} from 'axios';
import {
  IsReviewedDTO,
  QuestionCreateDTO,
  QuestionDTO,
  QuestionList,
} from '../models/admin/Question';
import {QuestionUpdate} from '../components/question/QuestionChoice';

export class QuestionsGateway {
  private restConnector: AxiosInstance;

  constructor(options: {restConnector: AxiosInstance}) {
    this.restConnector = options.restConnector;
  }

  public async createQuestions(body: QuestionCreateDTO): Promise<QuestionDTO> {
    const {data} = await this.restConnector.post(`/questions`, body);
    return data;
  }

  public async getQuestions(
    pageSize: number,
    pageNo: number,
  ): Promise<QuestionList> {
    const {data} = await this.restConnector.get(
      `/questions?pageSize=${pageSize}&pageNo=${pageNo}`,
    );
    return data;
  }

  public async updateQuestion(
    id: string,
    body: QuestionUpdate,
  ): Promise<QuestionDTO> {
    const {data} = await this.restConnector.put(`/questions/${id}`, body);
    return data;
  }

  public async makeIsReviewed(
    id: string,
    body: IsReviewedDTO,
  ): Promise<QuestionDTO> {
    const {data} = await this.restConnector.patch(`/questions/${id}`, body);
    return data;
  }

  public async getQuestion(id: string): Promise<QuestionDTO> {
    const {data} = await this.restConnector.get(`/questions/${id}`);
    return data;
  }

  public async deleteQuestion(id: string): Promise<void> {
    await this.restConnector.delete(`/questions/${id}`);
  }
}
