import { Routes } from '@angular/router';
import { MainPageGuard } from './core/guards/main-page.guard';
import { RoleGuard } from './core/guards/role.guard';
import { CodeByRoleName } from './core/role-handlers/CodeByRoleName';
import { AdminChildrenRoutes } from './system-pages/admin/shared/models/admin-children-routes';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { OrganizationSignUpComponent } from './auth/organization-sign-up/organization-sign-up.component';
import { OrganizationChildrenRoutes } from './system-pages/organization/shared/models/organization-children-routes';
import { WorkerChildrenRoutes } from './system-pages/worker/shared/models/worker-children-routes';
import { WorkerSignUpComponent } from './auth/worker-sign-up/worker-sign-up.component';
import { ParticipantSignUpComponent } from './auth/participant-sign-up/participant-sign-up.component';
import { ParticipantChildrenRoutes } from './system-pages/participant/shared/models/participant-children-routes';
import {HomeComponent} from './pages/landing/home/home.component';
import {SubscribeComponent} from './pages/landing/subscribe/subscribe.component';
import {AboutUsComponent} from './pages/landing/about-us/about-us.component';
import {ServicesComponent} from './pages/landing/services/services.component';
import {ContactComponent} from './pages/landing/contact/contact.component';
import {FaqComponent} from './pages/landing/faq/faq.component';
import {QuestChildrenRoutes} from './system-pages/quest/shared/models/quest-children-routes';

export const routes: Routes = [
  { path: 'auth', component: SignInComponent, data: { title: 'Sign in' } },
  {
    path: 'org-sign-up',
    component: OrganizationSignUpComponent,
    data: { title: 'Sign Up' },
  },
  {
    path: 'worker-sign-up/:id',
    component: WorkerSignUpComponent,
    data: { title: 'Sign Up' },
  },
  {
    path: 'participant-sign-up/:id',
    component: ParticipantSignUpComponent,
    data: { title: 'Sign Up' },
  },

  {
    path: '',
    loadComponent: () =>
      import('./system-pages/quest/quest.component').then((m) => m.QuestComponent),
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'subscribe', component: SubscribeComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'tool', component: FaqComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },


  {
    path: 'main',
    canActivate: [MainPageGuard],
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
    children: [
      {
        path: 'admin',
        loadComponent: () =>
          import('./system-pages/admin/admin.component').then(
            (m) => m.AdminComponent,
          ),
        canActivate: [RoleGuard],
        data: { permissionTypes: CodeByRoleName['admin'] },
        children: AdminChildrenRoutes.children,
      },
      {
        path: 'organization',
        loadComponent: () =>
          import('./system-pages/organization/organization.component').then(
            (m) => m.OrganizationComponent,
          ),
        canActivate: [RoleGuard],
        data: { permissionTypes: CodeByRoleName['organization'] },
        children: OrganizationChildrenRoutes.children,
      },

      {
        path: 'worker',
        loadComponent: () =>
          import('./system-pages/worker/worker.component').then(
            (m) => m.WorkerComponent,
          ),
        canActivate: [RoleGuard],
        data: { permissionTypes: CodeByRoleName['worker'] },
        children: WorkerChildrenRoutes.children,
      },
      {
        path: 'participant',
        loadComponent: () =>
          import('./system-pages/participant/participant.component').then(
            (m) => m.ParticipantComponent,
          ),
        canActivate: [RoleGuard],
        data: { permissionTypes: CodeByRoleName['participant'] },
        children: ParticipantChildrenRoutes.children,
      },
      // { path: '**', redirectTo: 'admin', pathMatch: 'full' },
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
    ],
  },
  // { path: '**', redirectTo: 'main', pathMatch: 'full' },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];
