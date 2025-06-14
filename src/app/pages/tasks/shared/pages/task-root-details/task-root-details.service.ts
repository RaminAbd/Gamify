import {inject, Injectable} from '@angular/core';
import {TaskRootDetailsComponent} from './task-root-details.component';
import {
  TaskRootsApiService
} from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/services/task-roots.api.service';
import {FormatDate} from '../../../../../core/extensions/format-date';
import {
  TasksApiService
} from '../../../../organization-projects/shared/pages/project-info/shared/pages/project-calendar/shared/services/tasks.api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskRootDetailsService {
  private service:TasksApiService = inject(TasksApiService)
  component: TaskRootDetailsComponent;

  constructor() { }

  getItems(){
    const req = {
      rootId:this.component.id,
      workerId:localStorage.getItem('id') as string,
    }
    this.service.getAllByRoot(req).subscribe(resp=>{
      resp.data = resp.data.map((item: any) => ({
        ...item,
        time: this.extractTime(item.deadline),
      }));
      this.component.items = resp.data;
      this.component.activeDateInfo = resp.data;
      let day = resp.data[0];
      day.dateString = this.formatDate(day.deadline);
      this.component.activeDateInfo = day;
    })
  }

  extractTime(isoDate: string): string {
    const dateObj = new Date(isoDate);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  formatDate(dateString: string): { formattedDate: string; dayOfWeek: string } {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
    const dayOfWeek = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(date);
    return { formattedDate, dayOfWeek };
  }

}
