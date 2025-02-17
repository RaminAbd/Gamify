import { Component, inject } from '@angular/core';
import { ProjectsResponseModel } from '../admin-projects/shared/models/projects-response.model';
import { OrganizationQuizzesService } from './organization-quizzes.service';
import { TableComponent } from '../../components/table/table.component';
import { QuizzesResponseModel } from './shared/models/quizzes-response.model';

@Component({
  selector: 'app-organization-quizzes',
  imports: [TableComponent],
  templateUrl: './organization-quizzes.component.html',
  styleUrl: './organization-quizzes.component.scss',
})
export class OrganizationQuizzesComponent {
  private service: OrganizationQuizzesService = inject(
    OrganizationQuizzesService,
  );
  quizzes: QuizzesResponseModel[] = [];
  cols: any[] = [];

  constructor() {
    this.service.component = this;
    this.service.getAll();
    this.service.setCols();
  }

  tableActionHandler(e: any) {
    this.service.tableActionHandler(e);
  }
}
