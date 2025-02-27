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
import {HomeComponent} from '../../../../pages/landing/home/home.component';
import {SubscribeComponent} from '../../../../pages/landing/subscribe/subscribe.component';
import {AboutUsComponent} from '../../../../pages/landing/about-us/about-us.component';
import {ServicesComponent} from '../../../../pages/landing/services/services.component';
import {ContactComponent} from '../../../../pages/landing/contact/contact.component';
import {FaqComponent} from '../../../../pages/landing/faq/faq.component';

export class QuestChildrenRoutes {
  static children: Route[] = [
    { path: 'home', component: HomeComponent },
    { path: 'subscribe', component: SubscribeComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'tool', component: FaqComponent },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
