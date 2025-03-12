import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-participant-navigation-bar',
  imports: [NavigationBarComponent],
  template: ` <app-navigation-bar [sections]="sections"></app-navigation-bar> `,
  styles: ``,
})
export class ParticipantNavigationBarComponent {
  sections: any[] = [
    {
      name: 'Portal menu',
      links: [
        {
          name: 'Home',
          url: 'participant/home',
          iconURL:'home.png'
        },
        {
          name: 'Projects',
          url: 'participant/projects',
          iconURL: 'projects.png',
        },
        {
          name: 'Invitations',
          url: 'participant/invitations',
          iconURL: 'invitations.png',
        },
        {
          name: 'Profile',
          url: 'participant/profile',
          iconURL: 'profile.png',
        },
      ],
    },
  ];
}
