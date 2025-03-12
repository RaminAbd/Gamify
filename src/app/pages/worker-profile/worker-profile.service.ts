import { inject, Injectable } from '@angular/core';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { BlobService } from '../../core/services/blob.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthApiService } from '../../auth/shared/services/auth.api.service';
import { OrganizationsRequestModel } from '../admin-organizations/shared/models/organizations-request.model';
import { WorkerProfileComponent } from './worker-profile.component';
import { GroupWorkersApiService } from '../organization-projects/shared/pages/project-info/shared/pages/project-groups/shared/pages/project-groups-details/shared/services/group-workers.api.service';
import { YouthWorkersApiService } from '../admin-workers/shared/services/youth-workers.api.service';
import { WorkerSignupRequestModel } from '../../auth/worker-sign-up/shared/models/worker-signup-request.model';
import { SelectAvatarComponent } from '../../components/select-avatar/select-avatar.component';

@Injectable({
  providedIn: 'root',
})
export class WorkerProfileService {
  private groupWorkerService: GroupWorkersApiService = inject(
    GroupWorkersApiService,
  );
  private service: YouthWorkersApiService = inject(YouthWorkersApiService);
  private blob = inject(BlobService);
  public dialogService: DialogService = inject(DialogService);
  private authService: AuthApiService = inject(AuthApiService);
  Copy: WorkerSignupRequestModel = new WorkerSignupRequestModel();
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: WorkerProfileComponent;
  constructor() {}

  getGroupWorker() {
    let id = localStorage.getItem('id') as string;
    this.service.GetById(this.service.serviceUrl, id).subscribe((resp) => {
      this.component.request = resp.data;
      this.Copy = structuredClone(resp.data);
    });
  }

  getFile(e: any, fileHandler: any) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.blob.UploadFile(fd).subscribe((resp: any) => {
        fileHandler(resp);
      });
    }
  }

  checkUserName() {
    this.component.signinLoading = true;
    this.authService.Exists(this.component.request.email).subscribe((resp) => {
      if (resp.data.exists) {
        this.message.showWarningMessage('User with given email already exists');
      } else {
        this.changeEmail();
      }
    });
  }

  private changeEmail() {
    this.service.ChangeEmail(this.component.request).subscribe((resp) => {
      this.update();
    });
  }

  update() {
    this.service
      .Update(this.service.serviceUrl, this.component.request)
      .subscribe((resp) => {
        if (resp.succeeded) {
          this.getGroupWorker();
          this.component.signinLoading = false;
        }
      });
  }
  openAvatars() {
    const ref = this.dialogService.open(SelectAvatarComponent, {
      header: 'Avatars',
      width: '800px',
      style: {
        maxWidth: '95%',
      },
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        this.component.request.image = e;
      }
    });
  }
}
