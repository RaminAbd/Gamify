import { Component, inject } from '@angular/core';
import { WorkerCalendarComponent } from '../worker-projects/shared/components/worker-calendar/worker-calendar.component';
import { Router } from '@angular/router';
import { ParticipantHomeService } from './participant-home.service';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { AssigneeModel } from '../tasks/shared/pages/task-root-details/shared/models/assignee.model';
import {ProjectsResponseModel} from '../admin-projects/shared/models/projects-response.model';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {ProjectDetailsModel} from './shared/models/project-details.model';
import {LevelResponseModel} from './shared/models/level-response.model';

@Component({
  selector: 'app-participant-home',
  imports: [WorkerCalendarComponent, NgForOf, NgIf, NgClass, DropdownModule, FormsModule],
  templateUrl: './participant-home.component.html',
  styleUrl: './participant-home.component.scss',
})
export class ParticipantHomeComponent {
  private router: Router = inject(Router);
  private service: ParticipantHomeService = inject(ParticipantHomeService);
  Tasks: any[] = [];
  assignee: AssigneeModel = new AssigneeModel();
  projects: ProjectsResponseModel[] = [];
  selectedProject: ProjectsResponseModel = new ProjectsResponseModel();
  projectDetails:ProjectDetailsModel = new ProjectDetailsModel();
  levelInfo:LevelResponseModel = new LevelResponseModel();
  constructor() {
    this.service.component = this;
    this.service.getParticipant();
    this.service.getProjects();
  }
  getInfos(){
    this.service.getDetails()
    this.service.getALlTasks()
    this.service.getParticipantLevel()
    console.log(this.selectedProject);
  }

  getTask($event: any) {
    console.log($event);
    switch ($event.type) {
      case 1:
        if ($event.status === 1)
          this.router.navigate([
            'main/participant/tasks/attendance',
            $event.id,
          ]);
        break;
      case 2:
        if ($event.status === 1)
          this.router.navigate([
            'main/participant/tasks/performance',
            $event.id,
          ]);
        break;
      case 3:
        if ($event.status === 1)
          this.router.navigate(['main/participant/tasks/quiz', $event.id]);
        else
          this.router.navigate([
            'main/participant/tasks/quiz-details',
            $event.id,
          ]);
        break;
    }
  }
}
