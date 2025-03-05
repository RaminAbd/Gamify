import { Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformanceResponseModel } from '../../../../participant-tasks/shared/models/performance-response.model';
import { PerformanceRequestModel } from '../../../../participant-tasks/shared/models/performance-request.model';
import { PerformanceService } from './performance.service';

@Component({
  selector: 'app-performance',
  imports: [NgForOf, NgIf, ReactiveFormsModule, FormsModule],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.scss',
})
export class PerformanceComponent {
  private service: PerformanceService = inject(PerformanceService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get('taskId') as string;
  task: PerformanceResponseModel = new PerformanceResponseModel();
  request: PerformanceRequestModel = new PerformanceRequestModel();
  points:number = 0
  constructor() {
    this.service.component = this;
    this.service.getTask();
  }

  finishTask() {
    if(this.task.files.length > 0 && this.points > 0){
      this.service.finishTask();
    }
  }
}
