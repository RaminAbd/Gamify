import {Component, inject} from '@angular/core';
import {UpsertHeadingComponent} from '../../../../../../../../components/upsert-heading/upsert-heading.component';
import {ActivatedRoute} from '@angular/router';
import {ProjectsRequestModel} from '../../../../../../../admin-projects/shared/models/projects-request.model';
import {
  OrganizationsResponseModel
} from '../../../../../../../admin-organizations/shared/models/organizations-response.model';
import {ProjectDetailsService} from './project-details.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-project-details',
  imports: [
    UpsertHeadingComponent,
    DatePipe
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent {
  public service: ProjectDetailsService = inject(
    ProjectDetailsService,
  );
  private route: ActivatedRoute = inject(ActivatedRoute);
  id = this.route.parent?.snapshot.paramMap.get('id') as string;
  request: ProjectsRequestModel = new ProjectsRequestModel();
  organizations: OrganizationsResponseModel[] = [];
  constructor() {
    this.service.component = this;
    this.service.GetAllOrganizations();
  }
}
