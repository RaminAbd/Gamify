import { Component } from '@angular/core';
import { WorkerNavigationBarComponent } from '../../navigation-bars/worker-navigation-bar/worker-navigation-bar.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-worker-header',
  imports: [HeaderComponent],
  template: ` <app-header [sections]="sections"></app-header> `,
  styles: ``,
})
export class WorkerHeaderComponent extends WorkerNavigationBarComponent {}
