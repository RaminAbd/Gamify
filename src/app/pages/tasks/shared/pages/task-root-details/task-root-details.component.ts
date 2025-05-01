import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskRootDetailsService } from './task-root-details.service';
import { TaskRootDetailsModel } from './shared/models/task-root-details.model';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { ActiveDateInfoModel } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/models/active-date-info.model';

@Component({
  selector: 'app-task-root-details',
  imports: [NgForOf, NgIf, NgClass],
  templateUrl: './task-root-details.component.html',
  styleUrl: './task-root-details.component.scss',
})
export class TaskRootDetailsComponent {
  private service: TaskRootDetailsService = inject(TaskRootDetailsService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  id = this.route.snapshot.paramMap.get('id') as string;
  items: TaskRootDetailsModel[] = [];
  activeDateInfo: ActiveDateInfoModel = new ActiveDateInfoModel();
  showWarning: boolean = false;
  constructor() {
    this.service.component = this;
    this.service.getItems();
  }

  isValidTask(task: any): boolean {
    const now = new Date(); // Current date and time
    const startTime = new Date(task.startTime);
    const deadline = new Date(task.deadline);
    console.log(startTime, deadline, now);
    return now >= startTime && now <= deadline;
  }

  getTask($event: any) {
    if (!this.isValidTask($event)) {
      this.showWarning = true;
      console.log(this.showWarning);
      return;
    }
    // if($event.status === 3) return;
    switch ($event.type) {
      case 1:
        this.router.navigate(['main/worker/tasks/attendance', $event.id]);
        break;
      case 2:
        this.router.navigate(['main/worker/tasks/performance', $event.id]);
        break;
      case 3:
        this.router.navigate(['main/worker/tasks/quiz-details', $event.id]);
        // this.router.navigate(['main/worker/tasks/quiz', $event.id]);
        break;
      case 4:
        this.router.navigate(['main/worker/tasks/voting', $event.id]);

        break;
    }
  }
}
