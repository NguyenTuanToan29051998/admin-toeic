import {QuestionsGateway} from '../gateways/QuestionsGateway';
import {
  IsReviewedDTO,
  QuestionCreateDTO,
  QuestionDTO,
  QuestionList,
} from '../models/admin/Question';
import {QuestionUpdate} from '../components/question/QuestionChoice';

export class QuestionsService {
  private questionsGateway: QuestionsGateway;

  constructor(options: {questionsGateway: QuestionsGateway}) {
    this.questionsGateway = options.questionsGateway;
  }

  public async createQuestions(body: QuestionCreateDTO): Promise<QuestionDTO> {
    return this.questionsGateway.createQuestions(body);
  }

  public async getQuestions(
    pageSize: number,
    pageNo: number,
  ): Promise<QuestionList> {
    return this.questionsGateway.getQuestions(pageSize, pageNo);
  }

  public async updateQuestion(
    id: string,
    body: QuestionUpdate,
  ): Promise<QuestionDTO> {
    return this.questionsGateway.updateQuestion(id, body);
  }

  public async makeIsReviewed(
    id: string,
    body: IsReviewedDTO,
  ): Promise<QuestionDTO> {
    return await this.questionsGateway.makeIsReviewed(id, body);
  }

  public async getQuestion(id: string): Promise<QuestionDTO> {
    return this.questionsGateway.getQuestion(id);
  }

  public async deleteQuestion(id: string): Promise<void> {
    await this.questionsGateway.deleteQuestion(id);
  }
}
