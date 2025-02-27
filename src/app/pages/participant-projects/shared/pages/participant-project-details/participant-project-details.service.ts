import { inject, Injectable } from '@angular/core';
import { ProjectsApiService } from '../../../../admin-projects/shared/services/projects.api.service';
import { ParticipantProjectDetailsComponent } from './participant-project-details.component';
import { TaskRootsApiService } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/services/task-roots.api.service';

@Injectable({
  providedIn: 'root',
})
export class ParticipantProjectDetailsService {
  protected service: ProjectsApiService = inject(ProjectsApiService);
  private taskRootService: TaskRootsApiService = inject(TaskRootsApiService);
  public component: ParticipantProjectDetailsComponent;
  constructor() {}
  getItem() {
    const req = {
      participantId: localStorage.getItem('id') as string,
      projectId: this.component.id,
    };
    this.service.getDetailsByParticipant(req).subscribe((resp) => {
      this.component.response = resp.data;
    });
  }
  getTasks() {
    let req: any = {
      projectId: this.component.id,
      workerId: localStorage.getItem('id') as string,
    };

    this.taskRootService.getAllByProject(req).subscribe((resp) => {
      this.component.Tasks = resp.data;
    });
  }
}
