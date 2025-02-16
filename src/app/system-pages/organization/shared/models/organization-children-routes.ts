import { Route } from '@angular/router';
import { OrganizationProjectsComponent } from '../../../../pages/organization-projects/organization-projects.component';
import {
  ProjectUpsertComponent
} from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-upsert/project-upsert.component';
import {
  ProjectInfoComponent
} from '../../../../pages/organization-projects/shared/pages/project-info/project-info.component';
import {
  ProjectDetailsComponent
} from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-details/project-details.component';
import {
  ProjectGroupsComponent
} from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-groups/project-groups.component';

export class OrganizationChildrenRoutes {
  static children: Route[] = [
    {
      path: 'projects',
      component: OrganizationProjectsComponent,
      data: { title: 'Projects' },
    },
    {
      path: 'projects/:id',
      component: ProjectInfoComponent,
      data: { title: 'Projects' },
      children: [
        {
          path: 'about',
          component: ProjectDetailsComponent,
          data: { title: 'Projects' },
        },
        {
          path: 'edit',
          component: ProjectUpsertComponent,
          data: { title: 'Projects' },
        },
        {
          path: 'groups',
          component: ProjectGroupsComponent,
          data: { title: 'Projects' },
        },
        { path: '', redirectTo: 'about', pathMatch: 'full' },
      ]
    },

    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
