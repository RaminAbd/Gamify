import {inject, Injectable} from '@angular/core';
import {QuizzesApiService} from '../../../../../services/quizzes.api.service';
import {ApplicationMessageCenterService} from '../../../../../../../../core/services/ApplicationMessageCenter.service';
import {QuizRequestModel} from '../../../../../models/quizzes-request.model'
import {QuestionsUpsertComponent} from './questions-upsert.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionsUpsertService {
  private service: QuizzesApiService = inject(QuizzesApiService);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: QuestionsUpsertComponent;
  constructor() {}

  getItem() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .subscribe((resp) => {
        this.component.request = resp.data;
        this.component.request.questions.forEach((item, i) => {
          item.index = i + 1;
        });
        this.component.request.questions =
          this.component.request.questions.sort((a, b) => b.index - a.index);
      });
  }

  save() {
    if (this.isValid()) {
      this.buildRequest();
    } else {
      this.message.showWarningMessage('Form is not valid');
    }
  }

  private buildRequest() {
    this.component.request.id = this.component.id;
    let request: QuizRequestModel = new QuizRequestModel();
    request = structuredClone(this.component.request);
    request.questions = request.questions.sort((a, b) => a.index - b.index);
    this.setQuestions(request);
  }

  private isValid() {
    let result = true;
    this.component.request.questions.forEach((question, i) => {
      if (!question.question) result = false;
      if (question.answers.length > 0) {
        question.answers.forEach((ans, i) => {
          if (!ans.answer) result = false;
        });
      } else {
        result = false;
      }
    });
    return result;
  }

  private setQuestions(request: QuizRequestModel) {
    this.service.SetQuestion(request).subscribe((resp) => {
      if (resp.succeeded) {
        this.message.showSuccessMessage('Successfully saved.');
        this.getItem();
      }
    });
  }
}
