import { Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpsertHeadingComponent } from '../../../../../../../../components/upsert-heading/upsert-heading.component';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizRequestModel } from '../../../../../models/quizzes-request.model';
import { QuestionModel } from '../../../../../models/question.model';
import { AnswerModel } from '../../../../../models/answer.model';
import { QuestionsUpsertService } from './questions-upsert.service';

@Component({
  selector: 'app-questions-upsert',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    UpsertHeadingComponent,
    FormsModule,
  ],
  templateUrl: './questions-upsert.component.html',
  styleUrl: './questions-upsert.component.scss',
})
export class QuestionsUpsertComponent {
  private service: QuestionsUpsertService = inject(QuestionsUpsertService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  id = this.route.parent?.snapshot.paramMap.get('id') as string;
  request: QuizRequestModel = new QuizRequestModel();
  constructor() {
    this.service.component = this;
    this.service.getItem();
  }

  addQuestion() {
    let newItem = new QuestionModel();
    if (this.request.questions.length > 0) {
      newItem.index = this.request.questions[0].index + 1;
    }
    else{
      newItem.index = 1
    }
    this.request.questions.unshift(newItem);
  }

  removeQuestion(i: number) {
    this.request.questions.splice(i, 1);
  }

  setCorrect(question: QuestionModel, ans: AnswerModel) {
    question.answers.map((x) => (x.correct = false));
    ans.correct = true;
  }

  addAnswer(question: QuestionModel) {
    let newItem = new AnswerModel();
    if (question.answers.length === 0) {
      newItem.correct = true;
    }
    question.answers.push(newItem);
  }

  removeAnswer(i: number, question: QuestionModel) {
    question.answers.splice(i, 1);
  }

  back() {
    this.router.navigate(['main/organization/quizzes']);
  }

  save() {
    this.service.save();
  }
}
