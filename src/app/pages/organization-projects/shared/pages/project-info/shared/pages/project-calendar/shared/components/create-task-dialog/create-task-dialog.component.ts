import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgForOf } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApplicationMessageCenterService } from '../../../../../../../../../../../core/services/ApplicationMessageCenter.service';
import { GroupInvitedMenResponseModel } from '../../../../project-groups/shared/pages/project-groups-details/shared/models/group-invited-men-response.model';
import { QuizzesResponseModel } from '../../../../../../../../../../organization-quizzes/shared/models/quizzes-response.model';
import { GroupsResponseModel } from '../../../../project-groups/shared/models/groups-response.model';
import { TaskRequestModel } from './shared/task-request.model';
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'app-create-task-dialog',
  imports: [FormsModule, NgForOf, ReactiveFormsModule, DropdownModule],
  templateUrl: './create-task-dialog.component.html',
  styleUrl: './create-task-dialog.component.scss',
})
export class CreateTaskDialogComponent {
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  public message = inject(ApplicationMessageCenterService);
  isSubmitted: boolean = false;
  quizzes: QuizzesResponseModel[] = this.config.data.quizzes;
  groups: GroupsResponseModel[] = this.config.data.groups;
  request: TaskRequestModel = new TaskRequestModel();

  save() {
    this.isSubmitted = true;
  }
}
