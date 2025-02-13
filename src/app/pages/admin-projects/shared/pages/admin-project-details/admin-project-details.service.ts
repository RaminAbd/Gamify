import { inject, Injectable } from '@angular/core';
import { ProjectsApiService } from '../../services/projects.api.service';
import { AdminProjectDetailsComponent } from './admin-project-details.component';
import { OrganizationsApiService } from '../../../../admin-organizations/shared/services/organizations.api.service';
import { FormatDate } from '../../../../../core/extensions/format-date';

@Injectable({
  providedIn: 'root',
})
export class AdminProjectDetailsService {
  private service: ProjectsApiService = inject(ProjectsApiService);
  private orgService: OrganizationsApiService = inject(OrganizationsApiService);
  component: AdminProjectDetailsComponent;
  constructor() {}

  GetAllOrganizations() {
    this.orgService.GetAll(this.orgService.serviceUrl).subscribe((resp) => {
      this.component.organizations = resp.data;
      this.getItem();
    });
  }

  getItem() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .subscribe((resp) => {
        this.component.request = resp.data;
        this.component.request.organization = this.findOrganization(
          resp.data.organizationId,
        );
        this.component.request.startDate = this.formatDate(resp.data.startDate);
        this.component.request.endDate = this.formatDate(resp.data.endDate);
      });
  }

  findOrganization(id: string) {
    let org = this.component.organizations.find((x) => x.id === id);
    return org ? org.name : '';
  }

  formatDate(date: any) {
    return new FormatDate(new Date(date), true).formattedDate;
  }
}
