import { AnswerModel } from './answer.model';

export class QuestionModel {
  index:number;
  question: string;
  answers: AnswerModel[] = [];
  points:number;
}
