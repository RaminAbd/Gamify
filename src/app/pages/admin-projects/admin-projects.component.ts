import { Component, inject } from '@angular/core';
import { AdminProjectsService } from './admin-projects.service';
import {ProjectsResponseModel} from './shared/models/projects-response.model';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-admin-projects',
  imports: [
    TableComponent
  ],
  templateUrl: './admin-projects.component.html',
  styleUrl: './admin-projects.component.scss',
})
export class AdminProjectsComponent {
  private service: AdminProjectsService = inject(AdminProjectsService);
  projects:ProjectsResponseModel[]=[]
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
