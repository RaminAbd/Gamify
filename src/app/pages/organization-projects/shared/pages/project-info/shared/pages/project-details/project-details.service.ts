import {inject, Injectable} from '@angular/core';
import {ProjectsApiService} from '../../../../../../../admin-projects/shared/services/projects.api.service';
import {
  OrganizationsApiService
} from '../../../../../../../admin-organizations/shared/services/organizations.api.service';
import {FormatDate} from '../../../../../../../../core/extensions/format-date';
import {ProjectDetailsComponent} from './project-details.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {
  protected service: ProjectsApiService = inject(ProjectsApiService);
  private orgService: OrganizationsApiService = inject(OrganizationsApiService);
  public  component: ProjectDetailsComponent;
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
        this.component.request.startDate = new Date(resp.data.startDate);
        this.component.request.endDate = new Date(resp.data.endDate);
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
