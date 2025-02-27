import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDetailedResponseModel } from '../../../../worker-projects/shared/models/project-detailed-response.model';
import { OrganizationsResponseModel } from '../../../../admin-organizations/shared/models/organizations-response.model';
import { ParticipantProjectDetailsService } from './participant-project-details.service';
import { WorkerCalendarComponent } from '../../../../worker-projects/shared/components/worker-calendar/worker-calendar.component';

@Component({
  selector: 'app-participant-project-details',
  imports: [WorkerCalendarComponent],
  templateUrl: './participant-project-details.component.html',
  styleUrl: './participant-project-details.component.scss',
})
export class ParticipantProjectDetailsComponent {
  public service: ParticipantProjectDetailsService = inject(
    ParticipantProjectDetailsService,
  );
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  id = this.route.snapshot.paramMap.get('id') as string;
  response: ProjectDetailedResponseModel = new ProjectDetailedResponseModel();
  organizations: OrganizationsResponseModel[] = [];
  Tasks: any[] = [];
  constructor() {
    this.service.component = this;
    this.service.getItem();
    this.getTasks();
  }
  getTasks() {
    this.service.getTasks();
  }

  getTask($event: any) {
    this.router.navigate(['main/worker/tasks', $event.id]);
  }
}
