import { Component, inject } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { ProjectsResponseModel } from '../admin-projects/shared/models/projects-response.model';
import { WorkerProjectsService } from './worker-projects.service';

@Component({
  selector: 'app-worker-projects',
  imports: [TableComponent],
  templateUrl: './worker-projects.component.html',
  styleUrl: './worker-projects.component.scss',
})
export class WorkerProjectsComponent {
  private service: WorkerProjectsService = inject(WorkerProjectsService);
  projects: ProjectsResponseModel[] = [];
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
