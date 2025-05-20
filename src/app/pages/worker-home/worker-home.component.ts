import { Component, inject } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { WorkerCalendarComponent } from '../worker-projects/shared/components/worker-calendar/worker-calendar.component';
import { Router } from '@angular/router';
import { AssigneeModel } from '../tasks/shared/pages/task-root-details/shared/models/assignee.model';
import { ProjectsResponseModel } from '../admin-projects/shared/models/projects-response.model';
import { ProjectDetailsModel } from '../participant-home/shared/models/project-details.model';
import { LevelResponseModel } from '../participant-home/shared/models/level-response.model';
import { WorkerHomeService } from './worker-home.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-worker-home',
  imports: [
    DropdownModule,
    NgForOf,
    NgIf,
    WorkerCalendarComponent,
    FormsModule,
    NgClass,
  ],
  templateUrl: './worker-home.component.html',
  styleUrl: './worker-home.component.scss',
})
export class WorkerHomeComponent {
  private router: Router = inject(Router);
  private service: WorkerHomeService = inject(WorkerHomeService);
  Tasks: any[] = [];
  assignee: AssigneeModel = new AssigneeModel();
  projects: ProjectsResponseModel[] = [];
  selectedProject: ProjectsResponseModel = new ProjectsResponseModel();
  projectDetails: ProjectDetailsModel = new ProjectDetailsModel();
  levelInfo: LevelResponseModel = new LevelResponseModel();
  showWarning: boolean = false;
  activeTasks:any[]=[]
  constructor() {
    this.service.component = this;
    this.service.getParticipant();
    this.service.getProjects();
  }

  getInfos() {
    this.service.getDetails();
    this.service.getALlTasks();
    this.service.getParticipantLevel();
  }

  isValidTask(task: any): boolean {
    const now = new Date(); // Current date and time
    const startTime = new Date(task.startTime);
    const deadline = new Date(task.deadline);
    console.log(startTime, deadline, now);
    return now >= startTime && now <= deadline;
  }

  getTask($event: any) {
    console.log($event);

    if (!this.isValidTask($event)) {
      this.showWarning = true;
      console.log(this.showWarning);
      return;
    }

    switch ($event.type) {
      case 1:
        if ($event.status === 1)
          this.router.navigate(['main/worker/tasks/attendance', $event.id]);
        break;
      case 2:
        if ($event.status === 1)
          this.router.navigate(['main/worker/tasks/performance', $event.id]);
        break;
      case 3:
        this.router.navigate(['main/worker/tasks/quiz-details', $event.id]);

        break;
      case 4:
        this.router.navigate(['main/worker/tasks/voting', $event.id]);

        break;
    }
  }
}
