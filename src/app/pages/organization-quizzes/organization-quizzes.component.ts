import { Component, inject, ViewChild } from '@angular/core';
import { ProjectsResponseModel } from '../admin-projects/shared/models/projects-response.model';
import { OrganizationQuizzesService } from './organization-quizzes.service';
import { TableComponent } from '../../components/table/table.component';
import { QuizzesResponseModel } from './shared/models/quizzes-response.model';
import { Popover } from 'primeng/popover';

@Component({
  selector: 'app-organization-quizzes',
  imports: [TableComponent, Popover],
  templateUrl: './organization-quizzes.component.html',
  styleUrl: './organization-quizzes.component.scss',
})
export class OrganizationQuizzesComponent {
  @ViewChild('op') op!: Popover;
  private service: OrganizationQuizzesService = inject(
    OrganizationQuizzesService,
  );
  quizzes: QuizzesResponseModel[] = [];
  cols: any[] = [];
  tableEvent: any;
  constructor() {
    this.service.component = this;
    this.service.getAll();
    this.service.setCols();
  }

  tableActionHandler(e: any) {
    this.service.tableActionHandler(e);
  }

  edit() {
    this.tableEvent.type = 2;
    this.service.tableActionHandler(this.tableEvent);
  }

  delete() {
    this.tableEvent.type = 3;
    this.service.tableActionHandler(this.tableEvent);
  }

  show() {
    this.tableEvent.type = 4;
    this.service.tableActionHandler(this.tableEvent);
  }

  action($event: any) {
    this.tableEvent = $event;
    if ($event.type === 5) {
      this.op.toggle($event.event);
    } else {
      this.service.tableActionHandler($event);
    }
  }
}
