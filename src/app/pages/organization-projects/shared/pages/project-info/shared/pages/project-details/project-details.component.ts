import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectsRequestModel} from '../../../../../../../admin-projects/shared/models/projects-request.model';
import {
  OrganizationsResponseModel
} from '../../../../../../../admin-organizations/shared/models/organizations-response.model';
import {ProjectDetailsService} from './project-details.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {
  LeaderBoardResponseModel
} from '../../../../../../../participant-projects/shared/models/leader-board-response.model';

@Component({
  selector: 'app-project-details',
  imports: [
    DatePipe,
    NgIf,
    NgForOf,
    NgClass
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
    this.service.getLeaderBoard();
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
