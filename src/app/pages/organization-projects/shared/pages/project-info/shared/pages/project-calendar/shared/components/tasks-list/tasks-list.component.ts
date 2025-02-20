import { Component, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {TasksResponseModel} from '../../models/tasks-response.model';

@Component({
  selector: 'app-tasks-list',
  imports: [NgForOf],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  id: string = this.config.data.projectId;
  tasks: TasksResponseModel[] = this.config.data.tasks;

  getItem(item: any) {
    console.log(item)
  }


}
