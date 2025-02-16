import {Component, inject} from '@angular/core';
import {TableComponent} from "../../components/table/table.component";
import {ProjectsResponseModel} from '../admin-projects/shared/models/projects-response.model';
import {OrganizationProjectsService} from './organization-projects.service';

@Component({
  selector: 'app-organization-projects',
    imports: [
        TableComponent
    ],
  templateUrl: './organization-projects.component.html',
  styleUrl: './organization-projects.component.scss'
})
export class OrganizationProjectsComponent {
  private service: OrganizationProjectsService = inject(OrganizationProjectsService);
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
