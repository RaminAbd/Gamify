import {inject, Injectable} from '@angular/core';
import {PQuizComponent} from '../p-quiz/p-quiz.component';
import {TaskQuizzesApiService} from '../../services/task-quizzes.api.service';
import {Router} from '@angular/router';
import {PQuizDetailsComponent} from './p-quiz-details.component';

@Injectable({
  providedIn: 'root'
})
export class PQuizDetailsService {
  component: PQuizDetailsComponent;
  private service: TaskQuizzesApiService = inject(TaskQuizzesApiService);
  private router: Router = inject(Router);
  constructor() {}

  getTask() {
    this.service
      .GetDetails(this.component.id)
      .subscribe((resp) => {
        this.component.task = resp.data;
      });
  }
}
