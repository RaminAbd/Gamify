import { Component, inject } from '@angular/core';
import { ProjectGroupsDetailsService } from './project-groups-details.service';
import { GroupsResponseModel } from '../../models/groups-response.model';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ProjectsRequestModel } from '../../../../../../../../../../admin-projects/shared/models/projects-request.model';
import { GroupInvitedMenResponseModel } from './shared/models/group-invited-men-response.model';

@Component({
  selector: 'app-project-groups-details',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './project-groups-details.component.html',
  styleUrl: './project-groups-details.component.scss',
})
export class ProjectGroupsDetailsComponent {
  private service: ProjectGroupsDetailsService = inject(
    ProjectGroupsDetailsService,
  );
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  projectId = this.route.parent?.snapshot.paramMap.get('id') as string;
  id = this.route.snapshot.paramMap.get('id') as string;
  group: GroupsResponseModel = new GroupsResponseModel();
  project: ProjectsRequestModel = new ProjectsRequestModel();

  groupParticipants: GroupInvitedMenResponseModel[] = [];
  constructor() {
    console.log(this.projectId);
    this.service.component = this;
    this.service.getProject();
    this.service.getItem();
  }

  back() {
    this.router.navigate([
      '/main/organization/projects/',
      this.projectId,
      'groups',
    ]);
  }
}
