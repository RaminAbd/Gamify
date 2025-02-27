import { Component, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ProjectsResponseModel } from '../admin-projects/shared/models/projects-response.model';
import { ParticipantProjectsService } from './participant-projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participant-projects',
  imports: [NgForOf],
  templateUrl: './participant-projects.component.html',
  styleUrl: './participant-projects.component.scss',
})
export class ParticipantProjectsComponent {
  private service: ParticipantProjectsService = inject(
    ParticipantProjectsService,
  );
  private router: Router = inject(Router);
  projects: ProjectsResponseModel[] = [];

  constructor() {
    this.service.component = this;
    this.service.getAll();
  }

  getDetail(id: string): void {
    this.router.navigate(['/main/participant/projects', id]);
  }
}
