import { inject, Injectable } from '@angular/core';
import { ProjectsApiService } from '../admin-projects/shared/services/projects.api.service';
import { ParticipantProjectsComponent } from './participant-projects.component';

@Injectable({
  providedIn: 'root',
})
export class ParticipantProjectsService {
  private service: ProjectsApiService = inject(ProjectsApiService);
  component: ParticipantProjectsComponent;
  getAll() {
    let id = localStorage.getItem('id') as string;
    this.service.GetAllByParticipant(id).subscribe((resp) => {
      this.component.projects = resp.data;
    });
  }
}
