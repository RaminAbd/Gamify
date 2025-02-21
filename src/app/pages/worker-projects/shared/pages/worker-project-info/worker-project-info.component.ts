import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-worker-project-info',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './worker-project-info.component.html',
  styleUrl: './worker-project-info.component.scss',
})
export class WorkerProjectInfoComponent {
  userId: string = localStorage.getItem('id') as string;
}
