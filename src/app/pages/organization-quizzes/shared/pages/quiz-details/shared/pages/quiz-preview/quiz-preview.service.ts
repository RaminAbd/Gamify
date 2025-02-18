import { inject, Injectable } from '@angular/core';
import { QuizzesApiService } from '../../../../../services/quizzes.api.service';
import { QuizPreviewComponent } from './quiz-preview.component';

@Injectable({
  providedIn: 'root',
})
export class QuizPreviewService {
  private service: QuizzesApiService = inject(QuizzesApiService);
  component: QuizPreviewComponent;
  constructor() {}

  getItem() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .subscribe((resp) => {
        this.component.request = resp.data;

      });
  }
}
