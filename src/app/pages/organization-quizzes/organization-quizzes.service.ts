import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzesApiService } from './shared/services/quizzes.api.service';
import { OrganizationQuizzesComponent } from './organization-quizzes.component';
import { Confirmation } from '../../core/extensions/confirmation';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { QuizRequestModel } from './shared/models/quizzes-request.model';
import { QuizUpsertComponent } from './shared/components/quiz-upsert/quiz-upsert.component';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationQuizzesService {
  private service: QuizzesApiService = inject(QuizzesApiService);
  private router: Router = inject(Router);
  private confirmationService: ConfirmationService =
    inject(ConfirmationService);
  public dialogService: DialogService = inject(DialogService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: OrganizationQuizzesComponent;

  getAll() {
    const id = localStorage.getItem('id') as string;
    this.service.GetAllByOrganization(id).subscribe((resp) => {
      this.component.quizzes = resp.data;
    });
  }

  setCols() {
    this.component.cols = [
      { field: 'name', header: 'Name' },
      { field: 'organizationName', header: 'Organization' },
      { field: 'dots', header: 'Actions' },
    ];
  }

  tableActionHandler(e: any) {
    switch (e.type) {
      case 1:
        this.openDialog('create');
        break;
      case 2:
        this.openDialog(e.data.id, e.data);
        break;
      case 3:
        this.confirm(e.data.id);
        break;
      case 4:
        this.router.navigate(['/main/organization/quizzes', e.data.id]);
        break;
    }
  }

  openDialog(quizId: string, quiz?: QuizRequestModel) {
    const ref = this.dialogService.open(QuizUpsertComponent, {
      header: 'Quiz',
      width: '460px',
      data: quiz ? quiz.name : '',
      style: {
        maxWidth: '95%',
      },
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        const req: QuizRequestModel = {
          name: e,
          organizationId: localStorage.getItem('id') as string,
          questions: quiz ? quiz.questions : [],
        };
        if (quizId === 'create') this.create(req);
        else {
          req.id = quizId;
          this.update(req);
        }
      }
    });
  }

  confirm(id: string) {
    Confirmation.confirm(
      this.confirmationService,
      'Are you sure you want to delete this group quiz?',
      () => {
        this.delete(id);
      },
    );
  }

  private delete(id: string) {
    this.service.Delete(this.service.serviceUrl, id).subscribe((resp) => {
      this.getAll();
    });
  }

  private create(req: QuizRequestModel) {
    this.service.Create(this.service.serviceUrl, req).subscribe((resp) => {
      if (resp.succeeded) {
        this.message.showSuccessMessage('Successfully created');
        this.getAll();
      }
    });
  }

  private update(req: QuizRequestModel) {
    this.service.Update(this.service.serviceUrl, req).subscribe((resp) => {
      if (resp.succeeded) {
        this.message.showSuccessMessage('Successfully updated');
        this.getAll();
      }
    });
  }
}
