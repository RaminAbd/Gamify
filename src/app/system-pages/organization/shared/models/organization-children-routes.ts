import { Route } from '@angular/router';
import { OrganizationProjectsComponent } from '../../../../pages/organization-projects/organization-projects.component';

export class OrganizationChildrenRoutes {
  static children: Route[] = [
    {
      path: 'projects',
      component: OrganizationProjectsComponent,
      data: { title: 'Projects' },
    },
    // {
    //   path: 'projects/:id',
    //   component: AdminProjectDetailsComponent,
    //   data: { title: 'Projects' },
    // },

    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
