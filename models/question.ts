export enum QUESTION_TYPE {
  PART1 = 'PART1',
  PART2 = 'PART2',
  PART3 = 'PART3',
  PART4 = 'PART4',
  PART5 = 'PART5',
  PART6 = 'PART6',
  PART7 = 'PART7',
  GRAMMAR = 'GRAMMAR',
  VOCABULARY = 'VOCABULARY',
}

export type AnswersType = {
  order?: number;
  content: string;
  isCorrect?: boolean;
};

export type QuestionType = {
  id: number;
  content: string;
  audio: string;
  images: string;
  typeQuestion: string;
  correctAnswerWord: string;
  answers: AnswersType[];
};

export type GroupQuestionType = {
  // id: number;
  content: string;
  images?: string;
  audio?: File;
  // typeQuestion: string;
  // correctAnswerWord: string;
  question: QuestionType[];
};
