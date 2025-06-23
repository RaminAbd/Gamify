import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDetailedResponseModel } from '../../../../worker-projects/shared/models/project-detailed-response.model';
import { OrganizationsResponseModel } from '../../../../admin-organizations/shared/models/organizations-response.model';
import { ParticipantProjectDetailsService } from './participant-project-details.service';
import { WorkerCalendarComponent } from '../../../../worker-projects/shared/components/worker-calendar/worker-calendar.component';
import {NgClass, NgForOf} from '@angular/common';
import {LeaderBoardResponseModel} from '../../models/leader-board-response.model';

@Component({
  selector: 'app-participant-project-details',
  imports: [WorkerCalendarComponent, NgForOf, NgClass],
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
  types: any = [
    { name: 'All', value: 0, selected: true },
    { name: 'Attendance', value: 1, selected: false },
    { name: 'Performance', value: 2 , selected: false},
    { name: 'Quiz', value: 3, selected: false },
    { name: 'Voting', value: 4 , selected: false},
  ];

  constructor() {
    this.service.component = this;
    this.service.getItem();
    this.getTasks();
    this.service.getLeaderBoard()
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
      case 4:
        this.router.navigate(['main/participant/tasks/voting', $event.id]);
        // if ($event.status === 1)

        // else
        //   this.router.navigate([
        //     'main/participant/tasks/quiz-details',
        //     $event.id,
        //   ]);
        break;
    }
  }
  leaderboard:LeaderBoardResponseModel[]=[]
  selectType(type: any) {
    this.types.map((x:any)=>x.selected = false);
    type.selected = true;
    this.service.getLeaderBoard();
  }
}
