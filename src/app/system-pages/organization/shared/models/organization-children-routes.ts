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
import { QuizDetailsComponent } from '../../../../pages/organization-quizzes/shared/pages/quiz-details/quiz-details.component';
import { QuizPreviewComponent } from '../../../../pages/organization-quizzes/shared/pages/quiz-details/shared/pages/quiz-preview/quiz-preview.component';
import {
  QuestionsUpsertComponent
} from '../../../../pages/organization-quizzes/shared/pages/quiz-details/shared/pages/questions-upsert/questions-upsert.component';
import {
  ProjectCalendarComponent
} from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-calendar/project-calendar.component';
import {
  ProjectLevelsComponent
} from '../../../../pages/organization-projects/shared/pages/project-info/shared/pages/project-levels/project-levels.component';
import {AttendanceComponent} from '../../../../pages/tasks/shared/pages/attendance/attendance.component';
import {PerformanceComponent} from '../../../../pages/tasks/shared/pages/performance/performance.component';
import {QuizComponent} from '../../../../pages/tasks/shared/pages/quiz/quiz.component';
import {
  PQuizDetailsComponent
} from '../../../../pages/participant-tasks/shared/pages/p-quiz-details/p-quiz-details.component';
import {OrganizationProfileComponent} from '../../../../pages/organization-profile/organization-profile.component';

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

        {
          path: 'calendar',
          component: ProjectCalendarComponent,
          data: { title: 'Projects' },
        },
        {
          path: 'levels',
          component: ProjectLevelsComponent,
          data: { title: 'Projects' },
        },
        { path: '', redirectTo: 'about', pathMatch: 'full' },
      ],
    },
    {
      path: 'quizzes',
      component: OrganizationQuizzesComponent,
      data: { title: 'Quizzes' },
    },
    {
      path: 'quizzes/:id',
      component: QuizDetailsComponent,
      data: { title: 'Quizzes' },
      children: [
        {
          path: 'about',
          component: QuizPreviewComponent,
          data: { title: 'Quizzes' },
        },
        {
          path: 'edit',
          component: QuestionsUpsertComponent,
          data: { title: 'Quizzes' },
        },
        { path: '', redirectTo: 'about', pathMatch: 'full' },
      ],
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
      path: 'tasks/quiz-details/:id',
      component: PQuizDetailsComponent,
      data: { title: 'Tasks' },
    },


    {
      path: 'profile',
      component: OrganizationProfileComponent,
      data: { title: 'Profile' },
    },
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
