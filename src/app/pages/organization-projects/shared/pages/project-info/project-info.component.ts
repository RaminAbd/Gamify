import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UpsertHeadingComponent} from '../../../../../components/upsert-heading/upsert-heading.component';

@Component({
  selector: 'app-project-info',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    UpsertHeadingComponent
  ],
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss'
})
export class ProjectInfoComponent {

}
