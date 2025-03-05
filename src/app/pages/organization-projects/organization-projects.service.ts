import { inject, Injectable } from '@angular/core';
import { ProjectsApiService } from '../admin-projects/shared/services/projects.api.service';
import { Router } from '@angular/router';
import { OrganizationProjectsComponent } from './organization-projects.component';
import { Confirmation } from '../../core/extensions/confirmation';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class OrganizationProjectsService {
  private service: ProjectsApiService = inject(ProjectsApiService);
  private router: Router = inject(Router);
  private confirmationService: ConfirmationService =
    inject(ConfirmationService);
  component: OrganizationProjectsComponent;

  getAll() {
    const id = localStorage.getItem('id') as string;
    this.service.GetAllByOrganization(id).subscribe((resp) => {
      this.component.projects = resp.data.map((item:any) => ({
        ...item,
        status:item.status === 1 ? 'On going' : 'Complete'
      }))
    });
  }


  setCols() {
    this.component.cols = [
      { field: 'name', header: 'Name' },
      { field: 'organization', header: 'Organization' },
      { field: 'status', header: 'Status' },
      { field: 'participantAmount', header: 'Participants' },
      { field: 'workerAmount', header: 'Workers' },
      { field: 'showDelete', header: 'Actions' },
    ];
  }

  tableActionHandler(e: any) {
    // /main/organization/projects/099f46fd-a339-4bfe-a084-14cad9b6b51c/edit
    switch (e.type) {
      case 1:
        this.router.navigate(['/main/organization/projects', 'create', 'edit']);
        break;
      case 3:
        this.confirm(e.data.id);
        break;
      case 4:
        this.router.navigate(['/main/organization/projects', e.data.id]);
        break;
    }
  }

  confirm(id: string) {
    Confirmation.confirm(
      this.confirmationService,
      'Are you sure you want to delete this group project?',
      () => {
        this.delete(id);
      },
    );
  }

  private delete(id: string) {
    this.service.Delete(this.service.serviceUrl, id).subscribe((resp) => {
      this.getAll();
    });
  }
}
