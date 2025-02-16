import {inject, Injectable} from '@angular/core';
import {ProjectsApiService} from '../admin-projects/shared/services/projects.api.service';
import {Router} from '@angular/router';
import {OrganizationProjectsComponent} from './organization-projects.component';

@Injectable({
  providedIn: 'root'
})
export class OrganizationProjectsService {
  private service: ProjectsApiService = inject(ProjectsApiService);
  private router: Router = inject(Router);
  component: OrganizationProjectsComponent;

  getAll() {
    const id = localStorage.getItem('id') as string;
    this.service.GetAllByOrganization(id).subscribe((resp) => {
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
        this.router.navigate(['/main/organization/projects', e.data.id]);
        break;
    }
  }
}
