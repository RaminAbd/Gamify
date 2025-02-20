import { AdminNavigationBarComponent } from '../../components/navigation-bars/admin-navigation-bar/admin-navigation-bar.component';
import { OrganizationNavigationBarComponent } from '../../components/navigation-bars/organization-navigation-bar/organization-navigation-bar.component';
import { WorkerNavigationBarComponent } from '../../components/navigation-bars/worker-navigation-bar/worker-navigation-bar.component';

export const SideBarComponentByRole = {
  ROLE_ADMIN: AdminNavigationBarComponent,
  ROLE_ORGANIZATION: OrganizationNavigationBarComponent,
  ROLE_YOUTHWORKER: WorkerNavigationBarComponent,
  // 'Educator':EducatorNavigationBarComponent,
  // 'Student':StudentNavigationBarComponent,
};
