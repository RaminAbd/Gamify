import { inject, Injectable } from '@angular/core';
import { PerformancesApiService } from '../../../../participant-tasks/shared/services/performances.api.service';
import { PerformanceComponent } from './performance.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  component: PerformanceComponent;
  private service: PerformancesApiService = inject(PerformancesApiService);
  private router: Router = inject(Router);
  constructor() {}

  getTask() {
    console.log(this.component.id);
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .subscribe((resp) => {
        this.component.task = resp.data;
        this.component.request.id = this.component.task.id;
      });
  }

  finishTask() {
    const req = {
      taskId: this.component.id,
      points: this.component.points,
    };
    this.service.Complete(req).subscribe((resp) => {
      if (resp.succeeded) {
        this.router.navigate(['main/worker/home']);
      }
    });
  }
}
