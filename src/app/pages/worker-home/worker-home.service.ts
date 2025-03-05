import {inject, Injectable} from '@angular/core';
import {
  TasksApiService
} from '../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/services/tasks.api.service';
import {ParticipantsApiService} from '../admin-participants/shared/services/participants.api.service';
import {ProjectsApiService} from '../admin-projects/shared/services/projects.api.service';
import {LevelsApiService} from '../participant-home/shared/services/levels.api.service';
import {FormatDate} from '../../core/extensions/format-date';
import {WorkerHomeComponent} from './worker-home.component';
import {YouthWorkersApiService} from '../admin-workers/shared/services/youth-workers.api.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerHomeService {
  private service: TasksApiService = inject(TasksApiService);
  private workersService: YouthWorkersApiService = inject(
    YouthWorkersApiService,
  );
  private projectsService: ProjectsApiService = inject(ProjectsApiService);
  private levelsService: LevelsApiService = inject(LevelsApiService);
  component: WorkerHomeComponent;
  constructor() {}

  getProjects(){
    let id = localStorage.getItem('id') as string;
    this.projectsService.GetAllByWorker(id).subscribe((resp) => {
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
      workerId: localStorage.getItem('id') as string,
      projectId:this.component.selectedProject.id
    }
    this.projectsService.getDetailsForWorker(req).subscribe((resp) => {
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
  //
  getParticipant() {
    const id = localStorage.getItem('id') as string;
    this.workersService
      .GetById(this.workersService.serviceUrl, id)
      .subscribe((resp) => {
        this.component.assignee = resp.data;
      });
  }

  getParticipantLevel() {
    const req = {
      workerId: localStorage.getItem('id') as string,
      projectId: this.component.selectedProject.id
    }
    this.levelsService.GetWorkerLevel(req).subscribe((resp) => {
      this.component.levelInfo = resp.data
    })
  }
}
