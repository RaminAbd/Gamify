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
    this.service.getALlTasks();
  }

  getTask($event: any) {
    console.log($event);
    switch ($event.type) {
      case 1:
        if ($event.status === 1)
          this.router.navigate([
            'main/participant/tasks/attendance',
            $event.id,
          ]);
        break;
      case 2:
        if ($event.status === 1)
          this.router.navigate([
            'main/participant/tasks/performance',
            $event.id,
          ]);
        break;
      case 3:
        if ($event.status === 1)
          this.router.navigate(['main/participant/tasks/quiz', $event.id]);
        else
          this.router.navigate([
            'main/participant/tasks/quiz-details',
            $event.id,
          ]);
        break;
    }
  }
}
