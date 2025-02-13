import { inject, Injectable } from '@angular/core';
import { AdminOrganizationsComponent } from './admin-organizations.component';
import { OrganizationsApiService } from './shared/services/organizations.api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminOrganizationsService {
  component: AdminOrganizationsComponent;
  private service: OrganizationsApiService = inject(OrganizationsApiService);
  private router: Router = inject(Router);
  constructor() {}

  getAll() {
    this.service.GetAll(this.service.serviceUrl).subscribe((resp) => {
      this.component.organizations = resp.data;
    });
  }

  setCols() {
    this.component.cols = [
      { field: 'name', header: 'Name' },
      { field: 'organizationId', header: 'Organization ID' },
      { field: 'email', header: 'Email' },
      { field: 'country', header: 'Country' },
      { field: 'show', header: 'Actions' },
    ];
  }

  tableActionHandler(e: any) {
    switch (e.type) {
      case 4:
        this.router.navigate(['/main/admin/organizations', e.data.id]);
        break;
    }
  }
}
