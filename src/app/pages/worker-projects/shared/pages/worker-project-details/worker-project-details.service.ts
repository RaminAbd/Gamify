import { inject, Injectable } from '@angular/core';
import { ProjectsApiService } from '../../../../admin-projects/shared/services/projects.api.service';
import { WorkerProjectDetailsComponent } from './worker-project-details.component';
import { TaskRootsApiService } from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/services/task-roots.api.service';
import {
  TasksApiService
} from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/services/tasks.api.service';

@Injectable({
  providedIn: 'root',
})
export class WorkerProjectDetailsService {
  protected service: ProjectsApiService = inject(ProjectsApiService);
  private taskRootService: TaskRootsApiService = inject(TaskRootsApiService);
  private tasksService: TasksApiService = inject(TasksApiService);

  public component: WorkerProjectDetailsComponent;
  constructor() {}
  getItem() {
    const req = {
      workerId: localStorage.getItem('id') as string,
      projectId: this.component.id,
    };
    this.service.getDetailsByWorker(req).subscribe((resp) => {
      this.component.response = resp.data;
    });
  }

  getTasks() {
    let req: any = {
      projectId: this.component.id,
      workerId: localStorage.getItem('id') as string,
    };

    this.taskRootService.getAllByProject(req).subscribe((resp) => {
      this.component.Tasks = resp.data;
      console.log(this.component.Tasks);
    });
  }

  getLeaderBoard(){
    let selected = this.component.types.find((type:any) => type.selected);
    const req:any = {
      projectId:this.component.id,
    }
    if(selected.value !== 0){
      req.type=selected.value
    }
    this.tasksService.getLeaderBoard(req).subscribe((resp) => {
      console.log(resp.data)
      this.component.leaderboard = resp.data;
    })
  }
}
