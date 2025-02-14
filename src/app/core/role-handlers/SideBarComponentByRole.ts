import { AdminNavigationBarComponent } from '../../components/navigation-bars/admin-navigation-bar/admin-navigation-bar.component';
import { OrganizationNavigationBarComponent } from '../../components/navigation-bars/organization-navigation-bar/organization-navigation-bar.component';

export const SideBarComponentByRole = {
  ROLE_ADMIN: AdminNavigationBarComponent,
  ROLE_ORGANIZATION: OrganizationNavigationBarComponent,
  // 'Educator':EducatorNavigationBarComponent,
  // 'Student':StudentNavigationBarComponent,
};
