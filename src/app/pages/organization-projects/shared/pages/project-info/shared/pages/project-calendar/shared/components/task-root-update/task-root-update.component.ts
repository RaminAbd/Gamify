import {Component, inject} from '@angular/core';
import {TaskRequestModel} from '../create-task-dialog/shared/task-request.model';
import {CreateTaskDialogService} from '../create-task-dialog/create-task-dialog.service';
import {TaskRootUpdateService} from './task-root-update.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {DatePicker, DatePickerModule} from 'primeng/datepicker';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-task-root-update',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    DatePicker,
    DatePickerModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './task-root-update.component.html',
  styleUrl: './task-root-update.component.scss'
})
export class TaskRootUpdateComponent {
  private service:TaskRootUpdateService = inject(TaskRootUpdateService)
  request: TaskRequestModel = new TaskRequestModel();
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  startDate: any;
  endDate: any;
  isSubmitted: boolean = false;
  constructor() {
    this.service.component = this;
    this.request = this.config.data;

    this.startDate = new Date(this.config.data.startTime);
    this.endDate = new Date(this.config.data.deadline);

  }

  save() {
    this.isSubmitted = true;
    this.service.save();
  }
}
