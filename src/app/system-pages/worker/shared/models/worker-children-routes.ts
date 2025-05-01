import { Route } from '@angular/router';
import { WorkerProjectsComponent } from '../../../../pages/worker-projects/worker-projects.component';
import { InvitationsComponent } from '../../../../pages/invitations/invitations.component';
import { WorkerProjectDetailsComponent } from '../../../../pages/worker-projects/shared/pages/worker-project-details/worker-project-details.component';
import { TasksComponent } from '../../../../pages/tasks/tasks.component';
import { AttendanceComponent } from '../../../../pages/tasks/shared/pages/attendance/attendance.component';
import { PerformanceComponent } from '../../../../pages/tasks/shared/pages/performance/performance.component';
import { QuizComponent } from '../../../../pages/tasks/shared/pages/quiz/quiz.component';
import { TaskRootDetailsComponent } from '../../../../pages/tasks/shared/pages/task-root-details/task-root-details.component';
import { WorkerHomeComponent } from '../../../../pages/worker-home/worker-home.component';
import { PQuizDetailsComponent } from '../../../../pages/participant-tasks/shared/pages/p-quiz-details/p-quiz-details.component';
import { OrganizationProfileComponent } from '../../../../pages/organization-profile/organization-profile.component';
import { WorkerProfileComponent } from '../../../../pages/worker-profile/worker-profile.component';
import {VotingComponent} from '../../../../pages/tasks/shared/pages/voting/voting.component';

export class WorkerChildrenRoutes {
  static children: Route[] = [
    {
      path: 'home',
      component: WorkerHomeComponent,
      data: { title: 'Home' },
    },
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
    {
      path: 'tasks',
      component: TasksComponent,
      data: { title: 'Tasks' },
    },
    {
      path: 'tasks/:id',
      component: TaskRootDetailsComponent,
      data: { title: 'Tasks' },
    },
    {
      path: 'tasks/attendance/:taskId',
      component: AttendanceComponent,
      data: { title: 'Tasks' },
    },
    {
      path: 'tasks/performance/:taskId',
      component: PerformanceComponent,
      data: { title: 'Tasks' },
    },
    {
      path: 'tasks/quiz/:taskId',
      component: QuizComponent,
      data: { title: 'Tasks' },
    },
    {
      path: 'tasks/voting/:id',
      component: VotingComponent,
      data: { title: 'Tasks' },
    },
    {
      path: 'tasks/quiz-details/:id',
      component: PQuizDetailsComponent,
      data: { title: 'Tasks' },
    },

    {
      path: 'profile',
      component: WorkerProfileComponent,
      data: { title: 'Profile' },
    },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
