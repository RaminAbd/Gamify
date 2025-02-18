import { QuestionModel } from './question.model';

export class QuizRequestModel {
  id?: string;
  name: string;
  organizationId: string;
  questions: QuestionModel[] = [];
}
