import { Route } from '@angular/router';
import { WorkerProjectsComponent } from '../../../../pages/worker-projects/worker-projects.component';
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
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
