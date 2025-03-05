import { Component, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TasksResponseModel } from '../../models/tasks-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  imports: [NgForOf],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  public router: Router = inject(Router);
  id: string = this.config.data.projectId;
  tasks: TasksResponseModel[] = this.config.data.tasks;

  getTask($event: any) {
    // if ($event.status === 3) return;
    this.ref.close()
    switch ($event.type) {
      case 1:
        this.router.navigate(['main/organization/tasks/attendance', $event.id]);
        break;
      case 2:
        this.router.navigate(['main/organization/tasks/performance', $event.id]);
        break;
      case 3:
        this.router.navigate(['main/organization/tasks/quiz-details', $event.id]);
        break;
    }
  }
}
