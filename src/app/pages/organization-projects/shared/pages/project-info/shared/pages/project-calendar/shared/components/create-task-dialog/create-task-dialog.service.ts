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

    if (this.isValid()) {
      this.buildRequest();
      this.create();
    } else {
      this.component.isSubmitted = false;
      this.message.showWarningMessage('Fields are not valid');
    }
  }

  private isValid() {
    let result = true;
    if (
      !this.component.request.name ||
      !this.component.request.type ||
      !this.component.startDate ||
      !this.component.endDate ||
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
    const start = new Date(this.component.startDate);
    start.setSeconds(0);
    start.setMilliseconds(0); // Optional: also remove milliseconds if needed

    const end = new Date(this.component.endDate);
    end.setSeconds(0);
    end.setMilliseconds(0); // Optional

    this.component.request.startTime = start.toISOString();
    this.component.request.deadline = end.toISOString();
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
          this.component.isSubmitted = false;
        }
      });
  }
}
