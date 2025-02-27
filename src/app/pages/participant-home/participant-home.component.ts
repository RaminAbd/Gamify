import { Component, inject } from '@angular/core';
import { WorkerCalendarComponent } from '../worker-projects/shared/components/worker-calendar/worker-calendar.component';
import { Router } from '@angular/router';
import { ParticipantHomeService } from './participant-home.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {AssigneeModel} from '../tasks/shared/pages/task-root-details/shared/models/assignee.model';

@Component({
  selector: 'app-participant-home',
  imports: [WorkerCalendarComponent, NgForOf, NgIf, NgClass],
  templateUrl: './participant-home.component.html',
  styleUrl: './participant-home.component.scss',
})
export class ParticipantHomeComponent {
  private router: Router = inject(Router);
  private service: ParticipantHomeService = inject(ParticipantHomeService);
  Tasks: any[] = [];
  assignee:AssigneeModel = new AssigneeModel();
  constructor() {
    this.service.component = this;
    this.service.getALlTasks();
    this.service.getParticipant();
  }
  getTask($event: any) {
    this.router.navigate(['main/worker/tasks', $event.id]);
  }
}
