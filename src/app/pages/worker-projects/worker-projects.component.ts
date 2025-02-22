import { Component, inject } from '@angular/core';
import { ProjectsResponseModel } from '../admin-projects/shared/models/projects-response.model';
import { WorkerProjectsService } from './worker-projects.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-worker-projects',
  imports: [NgForOf],
  templateUrl: './worker-projects.component.html',
  styleUrl: './worker-projects.component.scss',
})
export class WorkerProjectsComponent {
  private service: WorkerProjectsService = inject(WorkerProjectsService);
  projects: ProjectsResponseModel[] = [];
  cols: any[] = [];

  constructor() {
    this.service.component = this;
    this.service.getAll();
    this.service.setCols();
  }

  getDetail(id:string):void {
    this.service.getDetail(id)
  }
}
