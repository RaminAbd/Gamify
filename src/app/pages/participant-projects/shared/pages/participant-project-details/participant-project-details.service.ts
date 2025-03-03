import { inject, Injectable } from '@angular/core';
import { ProjectsApiService } from '../../../../admin-projects/shared/services/projects.api.service';
import { ParticipantProjectDetailsComponent } from './participant-project-details.component';
import { TaskRootsApiService } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/services/task-roots.api.service';
import {FormatDate} from '../../../../../core/extensions/format-date';
import {
  TasksApiService
} from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/services/tasks.api.service';

@Injectable({
  providedIn: 'root',
})
export class ParticipantProjectDetailsService {
  protected service: ProjectsApiService = inject(ProjectsApiService);
  private tasksService: TasksApiService = inject(TasksApiService);
  public component: ParticipantProjectDetailsComponent;
  constructor() {}
  getItem() {
    const req = {
      participantId: localStorage.getItem('id') as string,
      projectId: this.component.id,
    };
    this.service.getDetailsByParticipant(req).subscribe((resp) => {
      this.component.response = resp.data;
      console.log(this.component.response);
    });
  }


  getALlTasks() {
    const req = {
      assigneeId: localStorage.getItem('id') as string,
      projectId:this.component.id
    }
    this.tasksService.getAllForParticipant(req).subscribe((resp) => {
      this.component.Tasks = resp.data.map((task: any) => ({
        ...task,
        time: this.formatTime(task.deadline),
      }));
    });
  }

  formatTime(date: any) {
    return new FormatDate(new Date(date), true).formattedDate;
  }
}
