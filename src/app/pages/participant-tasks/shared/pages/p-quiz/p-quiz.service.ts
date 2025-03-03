import { inject, Injectable } from '@angular/core';
import { BlobService } from '../../../../../core/services/blob.service';
import { PQuizComponent } from './p-quiz.component';
import { TaskQuizzesApiService } from '../../services/task-quizzes.api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PQuizService {
  component: PQuizComponent;
  private service: TaskQuizzesApiService = inject(TaskQuizzesApiService);
  private router: Router = inject(Router);
  constructor() {}

  getTask() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .subscribe((resp) => {
        this.component.task = resp.data;
      });
  }

  save() {
    const req = this.transformQuizToRequest(
      this.component.task,
      this.component.id,
    );
    console.log(req);
    this.service.AnswerQuestions(req).subscribe((resp) => {
      if (resp.succeeded) {
        this.router.navigate(['/main/participant/tasks/finished']);
      }
    });
  }

  transformQuizToRequest(quiz: any, taskId: any) {
    return {
      taskId,
      quizId: quiz.id,
      questions: quiz.questions.map((q: any) => ({
        questionId: q.id,
        answerIds: q.answers
          .filter((a: any) => a.correct)
          .map((a: any) => a.id),
      })),
    };
  }
}
