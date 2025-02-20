import { inject, Injectable } from '@angular/core';
import { CreateTaskDialogComponent } from './create-task-dialog.component';
import { TaskRootsApiService } from '../../services/task-roots.api.service';
import { ApplicationMessageCenterService } from '../../../../../../../../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class CreateTaskDialogService {
  component: CreateTaskDialogComponent;
  private service: TaskRootsApiService = inject(TaskRootsApiService);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  constructor() {}

  save() {
    this.buildRequest();
    if (this.isValid()) {
      this.create();
    } else {
      this.message.showWarningMessage('Fields are not valid');
    }
  }

  private isValid() {
    let result = true;
    if (
      !this.component.request.name ||
      !this.component.request.type ||
      !this.component.request.startTime ||
      !this.component.request.deadline ||
      !this.component.request.description
    ) {
      result = false;
    }
    if (this.component.request.type === 3) {
      if (!this.component.request.source) result = false;
    }

    return result;
  }

  private buildRequest() {
    this.component.request.startTime = this.component.startDate.toISOString();
    this.component.request.deadline = this.component.endDate.toISOString();
    this.component.request.projectId = this.component.id;
    if (!this.component.request.source) delete this.component.request.source;
    if (!this.component.request.groupId) delete this.component.request.groupId;
  }

  private create() {
    this.service
      .Create(this.service.serviceUrl, this.component.request)
      .subscribe((resp) => {
        if (resp.succeeded) {
          this.component.ref.close(true);
          this.message.showSuccessMessage('Successfully created');
        }
      });
  }
}
