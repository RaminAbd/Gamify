import { inject, Injectable } from '@angular/core';
import { ProjectsApiService } from '../admin-projects/shared/services/projects.api.service';
import { Router } from '@angular/router';
import { WorkerProjectsComponent } from './worker-projects.component';

@Injectable({
  providedIn: 'root',
})
export class WorkerProjectsService {
  private service: ProjectsApiService = inject(ProjectsApiService);
  private router: Router = inject(Router);
  component: WorkerProjectsComponent;

  getAll() {
    let id = localStorage.getItem('id') as string;
    this.service.GetAllByWorker(id).subscribe((resp) => {
      this.component.projects = resp.data;
    });
  }

  setCols() {
    this.component.cols = [
      { field: 'name', header: 'Name' },
      { field: 'organization', header: 'Organization' },
      { field: 'status', header: 'Status' },
      { field: 'participantAmount', header: 'Participants' },
      { field: 'workerAmount', header: 'Workers' },
      { field: 'show', header: 'Actions' },
    ];
  }

  getDetail(id: any) {
    this.router.navigate(['/main/worker/projects', id]);
  }
}
