import { Route } from '@angular/router';
import { AdminProjectsComponent } from '../../../../pages/admin-projects/admin-projects.component';
import { AdminProjectDetailsComponent } from '../../../../pages/admin-projects/shared/pages/admin-project-details/admin-project-details.component';

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
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
