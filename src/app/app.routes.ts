import { Routes } from '@angular/router';
import { MainPageGuard } from './core/guards/main-page.guard';
import { RoleGuard } from './core/guards/role.guard';
import { CodeByRoleName } from './core/role-handlers/CodeByRoleName';
import { AdminChildrenRoutes } from './system-pages/admin/shared/models/admin-children-routes';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { OrganizationSignUpComponent } from './auth/organization-sign-up/organization-sign-up.component';
import { OrganizationChildrenRoutes } from './system-pages/organization/shared/models/organization-children-routes';

export const routes: Routes = [
  { path: 'auth', component: SignInComponent, data: { title: 'Sign in' } },
  {
    path: 'org-sign-up',
    component: OrganizationSignUpComponent,
    data: { title: 'Sign Up' },
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
      { path: '**', redirectTo: 'admin', pathMatch: 'full' },
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];
