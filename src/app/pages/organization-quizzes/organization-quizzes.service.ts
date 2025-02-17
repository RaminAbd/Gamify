import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzesApiService } from './shared/services/quizzes.api.service';
import {OrganizationQuizzesComponent} from './organization-quizzes.component';
import {Confirmation} from '../../core/extensions/confirmation';
import {ConfirmationService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class OrganizationQuizzesService {
  private service: QuizzesApiService = inject(QuizzesApiService);
  private router: Router = inject(Router);
  private confirmationService: ConfirmationService =
    inject(ConfirmationService);
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
      { field: 'showDelete', header: 'Actions' },
    ];
  }

  tableActionHandler(e: any) {
    switch (e.type) {
      case 3:
        this.confirm(e.data.id);
        break;
      case 4:
        this.router.navigate(['/main/organization/quizzes', e.data.id]);
        break;
    }
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
}
