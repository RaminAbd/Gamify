import { inject, Injectable } from '@angular/core';
import { ProjectGroupsDetailsComponent } from './project-groups-details.component';
import { GroupsApiService } from '../../services/groups.api.service';
import { ProjectsApiService } from '../../../../../../../../../../admin-projects/shared/services/projects.api.service';
import { GroupWorkersApiService } from './shared/services/group-workers.api.service';
import { GroupParticipantsApiService } from './shared/services/group-participants.api.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectGroupsDetailsService {
  private service: GroupsApiService = inject(GroupsApiService);
  private projectsService: ProjectsApiService = inject(ProjectsApiService);
  private participantsService: GroupParticipantsApiService = inject(
    GroupParticipantsApiService,
  );

  component: ProjectGroupsDetailsComponent;
  constructor() {}

  getItem() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .subscribe((resp) => {
        this.component.group = resp.data;
      });
  }

  getProject() {
    this.projectsService
      .GetById(this.projectsService.serviceUrl, this.component.projectId)
      .subscribe((resp) => {
        this.component.project = resp.data;
      });
  }


}
