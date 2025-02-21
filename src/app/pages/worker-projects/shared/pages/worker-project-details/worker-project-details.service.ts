import { inject, Injectable } from '@angular/core';
import { FormatDate } from '../../../../../core/extensions/format-date';
import { ProjectsApiService } from '../../../../admin-projects/shared/services/projects.api.service';
import { OrganizationsApiService } from '../../../../admin-organizations/shared/services/organizations.api.service';
import { WorkerProjectDetailsComponent } from './worker-project-details.component';

@Injectable({
  providedIn: 'root',
})
export class WorkerProjectDetailsService {
  protected service: ProjectsApiService = inject(ProjectsApiService);
  private orgService: OrganizationsApiService = inject(OrganizationsApiService);
  public component: WorkerProjectDetailsComponent;
  constructor() {}
  getItem() {
    const req = {
      workerId: localStorage.getItem('id') as string,
      projectId: this.component.id,
    };
    this.service.getDetailsByWorker(req).subscribe((resp) => {
      this.component.response = resp.data;
    });
  }
}
