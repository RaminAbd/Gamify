import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApplicationMessageCenterService } from '../../../../../../../../../../../core/services/ApplicationMessageCenter.service';
import { GroupInvitedMenResponseModel } from '../../../../project-groups/shared/pages/project-groups-details/shared/models/group-invited-men-response.model';
import { QuizzesResponseModel } from '../../../../../../../../../../organization-quizzes/shared/models/quizzes-response.model';
import { GroupsResponseModel } from '../../../../project-groups/shared/models/groups-response.model';
import { TaskRequestModel } from './shared/task-request.model';
import { DropdownModule } from 'primeng/dropdown';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { CreateTaskDialogService } from './create-task-dialog.service';

@Component({
  selector: 'app-create-task-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    DatePicker,
    DatePickerModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './create-task-dialog.component.html',
  styleUrl: './create-task-dialog.component.scss',
})
export class CreateTaskDialogComponent {
  public service: CreateTaskDialogService = inject(CreateTaskDialogService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  public message = inject(ApplicationMessageCenterService);
  isSubmitted: boolean = false;
  quizzes: QuizzesResponseModel[] = this.config.data.quizzes;
  groups: GroupsResponseModel[] = this.config.data.groups;
  id: string = this.config.data.projectId;
  request: TaskRequestModel = new TaskRequestModel();
  types: any = [
    { name: 'Attendance', value: 1 },
    { name: 'Performance', value: 2 },
    { name: 'Quiz', value: 3 },
  ];
  startDate: any;
  endDate: any;

  constructor() {
    this.service.component = this;
  }

  save() {
    this.isSubmitted = true;
    this.service.save();
  }
}
