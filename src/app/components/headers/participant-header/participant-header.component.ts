import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ParticipantNavigationBarComponent } from '../../navigation-bars/participant-navigation-bar/participant-navigation-bar.component';

@Component({
  selector: 'app-participant-header',
  imports: [HeaderComponent],
  template: ` <app-header [sections]="sections"></app-header> `,
  styles: ``,
})
export class ParticipantHeaderComponent extends ParticipantNavigationBarComponent {}
