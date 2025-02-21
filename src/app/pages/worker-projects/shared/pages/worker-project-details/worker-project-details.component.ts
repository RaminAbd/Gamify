import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsRequestModel } from '../../../../admin-projects/shared/models/projects-request.model';
import { OrganizationsResponseModel } from '../../../../admin-organizations/shared/models/organizations-response.model';
import { WorkerProjectDetailsService } from './worker-project-details.service';
import {DatePipe} from '@angular/common';
import {ProjectDetailedResponseModel} from '../../models/project-detailed-response.model';
import {WorkerCalendarComponent} from '../../components/worker-calendar/worker-calendar.component';

@Component({
  selector: 'app-worker-project-details',
  imports: [
    DatePipe,
    WorkerCalendarComponent
  ],
  templateUrl: './worker-project-details.component.html',
  styleUrl: './worker-project-details.component.scss',
})
export class WorkerProjectDetailsComponent {
  public service: WorkerProjectDetailsService = inject(
    WorkerProjectDetailsService,
  );
  private route: ActivatedRoute = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id') as string;
  response: ProjectDetailedResponseModel = new ProjectDetailedResponseModel();
  organizations: OrganizationsResponseModel[] = [];
  constructor() {
    this.service.component = this;
    this.service.getItem();
  }
}
