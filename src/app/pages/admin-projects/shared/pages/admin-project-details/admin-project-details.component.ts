import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpsertHeadingComponent } from '../../../../../components/upsert-heading/upsert-heading.component';
import { AdminProjectDetailsService } from './admin-project-details.service';
import { ProjectsRequestModel } from '../../models/projects-request.model';
import { OrganizationsResponseModel } from '../../../../admin-organizations/shared/models/organizations-response.model';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {LeaderBoardResponseModel} from '../../../../participant-projects/shared/models/leader-board-response.model';
@Component({
  selector: 'app-admin-project-details',
  imports: [UpsertHeadingComponent, NgIf, NgForOf, NgClass],
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
