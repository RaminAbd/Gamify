import { Route } from '@angular/router';
import { InvitationsComponent } from '../../../../pages/invitations/invitations.component';
import { WorkerProjectDetailsComponent } from '../../../../pages/worker-projects/shared/pages/worker-project-details/worker-project-details.component';
import {TasksComponent} from '../../../../pages/tasks/tasks.component';
import {AttendanceComponent} from '../../../../pages/tasks/shared/pages/attendance/attendance.component';
import {PerformanceComponent} from '../../../../pages/tasks/shared/pages/performance/performance.component';
import {QuizComponent} from '../../../../pages/tasks/shared/pages/quiz/quiz.component';
import {
  TaskRootDetailsComponent
} from '../../../../pages/tasks/shared/pages/task-root-details/task-root-details.component';
import {ParticipantProjectsComponent} from '../../../../pages/participant-projects/participant-projects.component';
import {
  ParticipantProjectDetailsComponent
} from '../../../../pages/participant-projects/shared/pages/participant-project-details/participant-project-details.component';
import {ParticipantHomeComponent} from '../../../../pages/participant-home/participant-home.component';

export class ParticipantChildrenRoutes {
  static children: Route[] = [
    {
      path: 'home',
      component: ParticipantHomeComponent,
      data: { title: 'Home' },
    },
    {
      path: 'invitations',
      component: InvitationsComponent,
      data: { title: 'Invitations' },
    },
    {
      path: 'projects',
      component: ParticipantProjectsComponent,
      data: { title: 'Projects' },
    },
    {
      path: 'projects/:id',
      component: ParticipantProjectDetailsComponent,
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


    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    // { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
