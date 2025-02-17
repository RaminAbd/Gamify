import { Route } from '@angular/router';
import { OrganizationProjectsComponent } from '../../../../pages/organization-projects/organization-projects.component';
import { ProjectUpsertComponent } from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-upsert/project-upsert.component';
import { ProjectInfoComponent } from '../../../../pages/organization-projects/shared/pages/project-info/project-info.component';
import { ProjectDetailsComponent } from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-details/project-details.component';
import { ProjectGroupsComponent } from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-groups/project-groups.component';
import { ProjectGroupsDetailsComponent } from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-groups/shared/pages/project-groups-details/project-groups-details.component';
import { GroupWorkersComponent } from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-groups/shared/pages/project-groups-details/shared/pages/group-workers/group-workers.component';
import { GroupParticipantsComponent } from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-groups/shared/pages/project-groups-details/shared/pages/group-participants/group-participants.component';
import { OrganizationQuizzesComponent } from '../../../../pages/organization-quizzes/organization-quizzes.component';

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
        {
          path: 'groups/:id',
          component: ProjectGroupsDetailsComponent,
          data: {
            title: 'Projects',
          },
          children: [
            {
              path: 'workers',
              component: GroupWorkersComponent,
              data: { title: 'Projects' },
            },
            {
              path: 'participants',
              component: GroupParticipantsComponent,
              data: { title: 'Projects' },
            },
            { path: '', redirectTo: 'workers', pathMatch: 'full' },
          ],
        },
        { path: '', redirectTo: 'about', pathMatch: 'full' },
      ],
    },
    {
      path: 'quizzes',
      component: OrganizationQuizzesComponent,
      data: { title: 'Quizzes' },
    },

    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
