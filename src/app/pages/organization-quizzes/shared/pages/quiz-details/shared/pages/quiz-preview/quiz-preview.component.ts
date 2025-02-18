import { Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizRequestModel } from '../../../../../models/quizzes-request.model';
import { QuizPreviewService } from './quiz-preview.service';
import { UpsertHeadingComponent } from '../../../../../../../../components/upsert-heading/upsert-heading.component';

@Component({
  selector: 'app-quiz-preview',
  imports: [NgForOf, NgIf, UpsertHeadingComponent],
  templateUrl: './quiz-preview.component.html',
  styleUrl: './quiz-preview.component.scss',
})
export class QuizPreviewComponent {
  private service: QuizPreviewService = inject(QuizPreviewService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  id = this.route.parent?.snapshot.paramMap.get('id') as string;
  request: QuizRequestModel = new QuizRequestModel();
  constructor() {
    this.service.component = this;
    this.service.getItem();
  }

  back() {
    this.router.navigate(['main/organization/quizzes']);
  }
}
