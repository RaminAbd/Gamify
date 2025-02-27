import { inject, Injectable } from '@angular/core';
import { TasksApiService } from '../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/services/tasks.api.service';
import { ParticipantHomeComponent } from './participant-home.component';
import { ParticipantsApiService } from '../admin-participants/shared/services/participants.api.service';

@Injectable({
  providedIn: 'root',
})
export class ParticipantHomeService {
  private service: TasksApiService = inject(TasksApiService);
  private participantsService: ParticipantsApiService = inject(
    ParticipantsApiService,
  );
  component: ParticipantHomeComponent;
  constructor() {}

  getALlTasks() {
    const id = localStorage.getItem('id') as string;
    this.service.getAllByParticipant(id).subscribe((resp) => {
      this.component.Tasks = resp.data;
    });
  }

  getParticipant() {
    const id = localStorage.getItem('id') as string;
    this.participantsService
      .GetById(this.participantsService.serviceUrl, id)
      .subscribe((resp) => {
        this.component.assignee = resp.data;
      });
  }
}
