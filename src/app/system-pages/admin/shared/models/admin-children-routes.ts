import { Route } from '@angular/router';
import { AdminProjectsComponent } from '../../../../pages/admin-projects/admin-projects.component';
import { AdminProjectDetailsComponent } from '../../../../pages/admin-projects/shared/pages/admin-project-details/admin-project-details.component';
import { AdminOrganizationsComponent } from '../../../../pages/admin-organizations/admin-organizations.component';
import { AdminOrganizationDetailsComponent } from '../../../../pages/admin-organizations/shared/pages/admin-organization-details/admin-organization-details.component';

export class AdminChildrenRoutes {
  static children: Route[] = [
    {
      path: 'projects',
      component: AdminProjectsComponent,
      data: { title: 'Projects' },
    },
    {
      path: 'projects/:id',
      component: AdminProjectDetailsComponent,
      data: { title: 'Projects' },
    },

    {
      path: 'organizations',
      component: AdminOrganizationsComponent,
      data: { title: 'Organizations' },
    },
    {
      path: 'organizations/:id',
      component: AdminOrganizationDetailsComponent,
      data: { title: 'Organizations' },
    },
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
