import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-organization-navigation-bar',
  imports: [NavigationBarComponent],
  template: ` <app-navigation-bar [sections]="sections"></app-navigation-bar> `,
  styles: ``,
})
export class OrganizationNavigationBarComponent {
  sections: any[] = [
    {
      name: 'Portal menu',
      links: [
        {
          name: 'Projects',
          url: 'organization/projects',
          iconURL: 'projects.png',
        },
        {
          name: 'Quizzes',
          url: 'organization/quizzes',
          iconURL: 'projects.png',
        },
        {
          name: 'Profile',
          url: 'organization/profile',
          iconURL: 'projects.png',
        },
      ],
    },
  ];
}
