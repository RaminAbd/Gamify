import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformanceResponseModel } from '../../models/performance-response.model';
import { PerformanceRequestModel } from '../../models/performance-request.model';
import { PQuizService } from './p-quiz.service';
import {QuizRequestModel} from '../../../../organization-quizzes/shared/models/quizzes-request.model';
import {NgForOf, NgIf} from '@angular/common';
import {QuestionModel} from '../../../../organization-quizzes/shared/models/question.model';
import {AnswerModel} from '../../../../organization-quizzes/shared/models/answer.model';

@Component({
  selector: 'app-p-quiz',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './p-quiz.component.html',
  styleUrl: './p-quiz.component.scss',
})
export class PQuizComponent {
  private service: PQuizService = inject(PQuizService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  id = this.route.snapshot.paramMap.get('id') as string;
  task: QuizRequestModel = new QuizRequestModel();
  request: PerformanceRequestModel = new PerformanceRequestModel();
  constructor() {
    this.service.component = this;
    this.request.id = this.id;
    this.service.getTask();
  }

  setCorrect(question: QuestionModel, ans: AnswerModel) {
    question.answers.map((x) => (x.correct = false));
    ans.correct = true;
  }

  finish(){
    this.service.save()
  }
}
