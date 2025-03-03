import {Component, inject} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {PQuizService} from '../p-quiz/p-quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizRequestModel} from '../../../../organization-quizzes/shared/models/quizzes-request.model';
import {PerformanceRequestModel} from '../../models/performance-request.model';
import {QuestionModel} from '../../../../organization-quizzes/shared/models/question.model';
import {AnswerModel} from '../../../../organization-quizzes/shared/models/answer.model';
import {PQuizDetailsService} from './p-quiz-details.service';

@Component({
  selector: 'app-p-quiz-details',
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './p-quiz-details.component.html',
  styleUrl: './p-quiz-details.component.scss'
})
export class PQuizDetailsComponent {
  private service: PQuizDetailsService = inject(PQuizDetailsService);
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

  backToHome() {
    this.router.navigate(['main/participant/home'])
  }
}
