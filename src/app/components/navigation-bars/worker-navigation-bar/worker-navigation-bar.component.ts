import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-worker-navigation-bar',
  imports: [NavigationBarComponent],
  template: ` <app-navigation-bar [sections]="sections"></app-navigation-bar> `,
  styles: ``,
})
export class WorkerNavigationBarComponent {
  sections: any[] = [
    {
      name: 'Portal menu',
      links: [
        {
          name: 'Home',
          url: 'worker/home',
          iconURL:'home.png'
        },
        {
          name: 'Projects',
          url: 'worker/projects',
          iconURL: 'projects.png',
        },
        {
          name: 'Invitations',
          url: 'worker/invitations',
          iconURL: 'invitations.png',
        },
      ],
    },
  ];
}
