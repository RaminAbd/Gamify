import { inject, Injectable } from '@angular/core';
import { AdminOrganizationDetailsComponent } from './admin-organization-details.component';
import { OrganizationsApiService } from '../../services/organizations.api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminOrganizationDetailsService {
  component: AdminOrganizationDetailsComponent;
  private service: OrganizationsApiService = inject(OrganizationsApiService);
  constructor() {}

  getItem() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .subscribe((resp) => {
        this.component.request = resp.data;
      });
  }
}
