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
import {
  PAttendanceComponent
} from '../../../../pages/participant-tasks/shared/pages/p-attendance/p-attendance.component';
import {
  PPerformanceComponent
} from '../../../../pages/participant-tasks/shared/pages/p-performance/p-performance.component';
import {PQuizComponent} from '../../../../pages/participant-tasks/shared/pages/p-quiz/p-quiz.component';
import {
  TaskFinishedComponent
} from '../../../../pages/participant-tasks/shared/pages/task-finished/task-finished.component';
import {
  PQuizDetailsComponent
} from '../../../../pages/participant-tasks/shared/pages/p-quiz-details/p-quiz-details.component';
import {
  ParticipantInvitationsComponent
} from '../../../../pages/participant-invitations/participant-invitations.component';
import {WorkerProfileComponent} from '../../../../pages/worker-profile/worker-profile.component';
import {ParticipantProfileComponent} from '../../../../pages/participant-profile/participant-profile.component';
import {PVotingComponent} from '../../../../pages/participant-tasks/shared/pages/p-voting/p-voting.component';

export class ParticipantChildrenRoutes {
  static children: Route[] = [
    {
      path: 'home',
      component: ParticipantHomeComponent,
      data: { title: 'Home' },
    },
    {
      path: 'invitations',
      component: ParticipantInvitationsComponent,
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

    // {
    //   path: 'tasks',
    //   component: TasksComponent,
    //   data: { title: 'Tasks' },
    // },
    // {
    //   path: 'tasks/:id',
    //   component: TaskRootDetailsComponent,
    //   data: { title: 'Tasks' },
    // },



    {
      path: 'tasks/attendance/:id',
      component: PAttendanceComponent,
      data: { title: 'Tasks' },
    },
    {
      path: 'tasks/performance/:id',
      component: PPerformanceComponent,
      data: { title: 'Tasks' },
    },
    {
      path: 'tasks/quiz/:id',
      component: PQuizComponent,
      data: { title: 'Tasks' },
    },
    {
      path: 'tasks/voting/:id',
      component: PVotingComponent,
      data: { title: 'Tasks' },
    },
    {
      path: 'tasks/finished',
      component: TaskFinishedComponent,
      data: { title: 'Tasks' },
    },

    {
      path: 'tasks/quiz-details/:id',
      component: PQuizDetailsComponent,
      data: { title: 'Tasks' },
    },
    {
      path: 'profile',
      component: ParticipantProfileComponent,
      data: { title: 'Profile' },
    },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
