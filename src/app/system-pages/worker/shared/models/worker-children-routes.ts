import { Route } from '@angular/router';
import { ProjectDetailsComponent } from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-details/project-details.component';
import { ProjectCalendarComponent } from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-calendar/project-calendar.component';
import { WorkerProjectsComponent } from '../../../../pages/worker-projects/worker-projects.component';
import { WorkerProjectInfoComponent } from '../../../../pages/worker-projects/shared/pages/worker-project-info/worker-project-info.component';
import { InvitationsComponent } from '../../../../pages/invitations/invitations.component';
import { WorkerProjectDetailsComponent } from '../../../../pages/worker-projects/shared/pages/worker-project-details/worker-project-details.component';

export class WorkerChildrenRoutes {
  static children: Route[] = [
    {
      path: 'invitations',
      component: InvitationsComponent,
      data: { title: 'Invitations' },
    },
    {
      path: 'projects',
      component: WorkerProjectsComponent,
      data: { title: 'Projects' },
    },
    {
      path: 'projects/:id',
      component: WorkerProjectDetailsComponent,
      data: { title: 'Projects' },
    },
    // {
    //   path: 'projects/:id',
    //   component: WorkerProjectInfoComponent,
    //   data: { title: 'Projects' },
    //   children: [
    //     {
    //       path: 'about',
    //       component: ProjectDetailsComponent,
    //       data: { title: 'Projects' },
    //     },
    //     {
    //       path: 'calendar',
    //       component: ProjectCalendarComponent,
    //       data: { title: 'Projects' },
    //     },
    //     {
    //       path: 'calendar/:id',
    //       component: ProjectCalendarComponent,
    //       data: { title: 'Projects' },
    //     },
    //     { path: '', redirectTo: 'about', pathMatch: 'full' },
    //   ],
    // },
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
