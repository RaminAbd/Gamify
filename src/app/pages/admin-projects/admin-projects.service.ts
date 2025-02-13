import { inject, Injectable } from '@angular/core';
import { ProjectsApiService } from './shared/services/projects.api.service';
import { AdminProjectsComponent } from './admin-projects.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminProjectsService {
  private service: ProjectsApiService = inject(ProjectsApiService);
  private router: Router = inject(Router);
  component: AdminProjectsComponent;

  getAll() {
    this.service.GetAll(this.service.serviceUrl).subscribe((resp) => {
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

  tableActionHandler(e: any) {
    switch (e.type) {
      case 4:
        this.router.navigate(['/main/admin/projects', e.data.id]);
        break;
    }
  }
}
