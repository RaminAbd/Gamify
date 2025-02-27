import { Component, inject } from '@angular/core';
import { ProjectsResponseModel } from '../admin-projects/shared/models/projects-response.model';
import { WorkerProjectsService } from './worker-projects.service';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-projects',
  imports: [NgForOf],
  templateUrl: './worker-projects.component.html',
  styleUrl: './worker-projects.component.scss',
})
export class WorkerProjectsComponent {
  private service: WorkerProjectsService = inject(WorkerProjectsService);
  private router: Router = inject(Router);
  projects: ProjectsResponseModel[] = [];

  constructor() {
    this.service.component = this;
    this.service.getAll();
  }

  getDetail(id: string): void {
    this.router.navigate(['/main/worker/projects', id]);
  }
}
