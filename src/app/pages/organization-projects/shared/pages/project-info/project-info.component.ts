import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-project-info',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf,
  ],
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss'
})
export class ProjectInfoComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id') as string;
}
