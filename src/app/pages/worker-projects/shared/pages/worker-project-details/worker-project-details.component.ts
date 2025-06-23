import { Component, inject } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { OrganizationsResponseModel } from '../../../../admin-organizations/shared/models/organizations-response.model';
import { WorkerProjectDetailsService } from './worker-project-details.service';
import {ProjectDetailedResponseModel} from '../../models/project-detailed-response.model';
import {WorkerCalendarComponent} from '../../components/worker-calendar/worker-calendar.component';
import {NgClass, NgForOf} from "@angular/common";
import {LeaderBoardResponseModel} from '../../../../participant-projects/shared/models/leader-board-response.model';

@Component({
  selector: 'app-worker-project-details',
  imports: [
    WorkerCalendarComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './worker-project-details.component.html',
  styleUrl: './worker-project-details.component.scss',
})
export class WorkerProjectDetailsComponent {
  public service: WorkerProjectDetailsService = inject(
    WorkerProjectDetailsService,
  );
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  id = this.route.snapshot.paramMap.get('id') as string;
  response: ProjectDetailedResponseModel = new ProjectDetailedResponseModel();
  organizations: OrganizationsResponseModel[] = [];
  Tasks:any[]=[]
  constructor() {
    this.service.component = this;
    this.service.getItem();
    this.getTasks()
    this.service.getLeaderBoard()
  }
  getTasks() {
    this.service.getTasks();
  }

  getTask($event: any) {
    this.router.navigate(['main/worker/tasks', $event.id]);
  }
  types: any = [
    { name: 'All', value: 0, selected: true },
    { name: 'Attendance', value: 1, selected: false },
    { name: 'Performance', value: 2 , selected: false},
    { name: 'Quiz', value: 3, selected: false },
    { name: 'Voting', value: 4 , selected: false},
  ];
  leaderboard:LeaderBoardResponseModel[]=[]
  selectType(type: any) {
    this.types.map((x:any)=>x.selected = false);
    type.selected = true;
    this.service.getLeaderBoard();
  }
}
