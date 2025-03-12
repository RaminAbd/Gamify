import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpsertHeadingComponent } from '../../../../../components/upsert-heading/upsert-heading.component';
import { AdminProjectDetailsService } from './admin-project-details.service';
import { ProjectsRequestModel } from '../../models/projects-request.model';
import { OrganizationsResponseModel } from '../../../../admin-organizations/shared/models/organizations-response.model';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-admin-project-details',
  imports: [UpsertHeadingComponent, NgIf],
  templateUrl: './admin-project-details.component.html',
  styleUrl: './admin-project-details.component.scss',
})
export class AdminProjectDetailsComponent {
  private service: AdminProjectDetailsService = inject(
    AdminProjectDetailsService,
  );
  private route: ActivatedRoute = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id') as string;
  request: ProjectsRequestModel = new ProjectsRequestModel();
  organizations: OrganizationsResponseModel[] = [];
  constructor() {
    this.service.component = this;
    this.service.GetAllOrganizations();
  }
}
