import { inject, Injectable } from '@angular/core';
import { TasksApiService } from '../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/services/tasks.api.service';
import { ParticipantHomeComponent } from './participant-home.component';
import { ParticipantsApiService } from '../admin-participants/shared/services/participants.api.service';
import {ProjectsApiService} from '../admin-projects/shared/services/projects.api.service';
import {LevelsApiService} from './shared/services/levels.api.service';
import {FormatDate} from '../../core/extensions/format-date';

@Injectable({
  providedIn: 'root',
})
export class ParticipantHomeService {
  private service: TasksApiService = inject(TasksApiService);
  private participantsService: ParticipantsApiService = inject(
    ParticipantsApiService,
  );
  private projectsService: ProjectsApiService = inject(ProjectsApiService);
  private levelsService: LevelsApiService = inject(LevelsApiService);
  component: ParticipantHomeComponent;
  constructor() {}

  getProjects(){
    let id = localStorage.getItem('id') as string;
    this.projectsService.GetAllByParticipant(id).subscribe((resp) => {
      this.component.projects = resp.data.map((project: any) => ({
        ...project,
        name: project.name + '`s tasks',
      }));
      this.component.selectedProject = this.component.projects[0];
      this.component.getInfos()
    });
  }

  getDetails(){
    const req = {
      participantId: localStorage.getItem('id') as string,
      projectId:this.component.selectedProject.id
    }
    this.projectsService.getDetailsByParticipant(req).subscribe((resp) => {
      console.log(resp.data);
      this.component.projectDetails = resp.data;
    })
  }

  getALlTasks() {
    // const id = localStorage.getItem('id') as string;
    const req = {
      assigneeId: localStorage.getItem('id') as string,
      projectId:this.component.selectedProject.id
    }
    this.service.getAllForParticipant(req).subscribe((resp) => {
      this.component.Tasks = resp.data.map((task: any) => ({
        ...task,
        time: this.formatTime(task.deadline),
      }));
    });
  }
  formatTime(date: any) {
    return new FormatDate(new Date(date), true).formattedDate;
  }
  getParticipant() {
    const id = localStorage.getItem('id') as string;
    this.participantsService
      .GetById(this.participantsService.serviceUrl, id)
      .subscribe((resp) => {
        this.component.assignee = resp.data;
      });
  }

  getParticipantLevel() {
    const req = {
      participantId: localStorage.getItem('id') as string,
      projectId: this.component.selectedProject.id
    }
    this.levelsService.GetParticipantLevel(req).subscribe((resp) => {
      this.component.levelInfo = resp.data
    })
  }
}
