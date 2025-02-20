import { inject, Injectable } from '@angular/core';
import { OrganizationsApiService } from '../../pages/admin-organizations/shared/services/organizations.api.service';
import { AuthApiService } from '../shared/services/auth.api.service';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { BlobService } from '../../core/services/blob.service';
import { VerificationsApiService } from '../shared/services/verifications.api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { SignInService } from '../sign-in/sign-in.service';
import { OrganizationSignUpComponent } from '../organization-sign-up/organization-sign-up.component';
import { OtpCodeComponent } from '../organization-sign-up/shared/components/otp-code/otp-code.component';
import { AuthRequestModel } from '../shared/models/auth-request.model';
import { WorkerSignupUpComponent } from './worker-signup-up.component';
import { GroupWorkersApiService } from '../../pages/organization-projects/shared/pages/project-info/shared/pages/project-groups/shared/pages/project-groups-details/shared/services/group-workers.api.service';
import {YouthWorkersApiService} from '../../pages/admin-workers/shared/services/youth-workers.api.service';

@Injectable({
  providedIn: 'root',
})
export class WorkerSignupUpService {
  // bc0380b4-992a-410c-be56-6640ae62f167
  private groupWorkerService: GroupWorkersApiService = inject(
    GroupWorkersApiService,
  );
  private service: YouthWorkersApiService = inject(YouthWorkersApiService);
  private authService: AuthApiService = inject(AuthApiService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  private blob = inject(BlobService);
  private verificationService = inject(VerificationsApiService);
  public dialogService: DialogService = inject(DialogService);
  public signInService: SignInService = inject(SignInService);
  component: WorkerSignupUpComponent;
  constructor() {}

  getGroupWorker() {
    this.groupWorkerService
      .GetById(this.groupWorkerService.serviceUrl, this.component.groupWorkerId)
      .subscribe((resp) => {
        this.component.request.email = resp.data.email;
        this.component.request.groupWorkerId = resp.data.id;
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
        this.signup();
      }
    });
  }

  private signup() {
    console.log(this.component.request);
    this.service.SignUp(this.component.request).subscribe((resp) => {
      if (resp.succeeded) {
        const req: AuthRequestModel = {
          username: this.component.request.email,
          password: this.component.request.password,
          remember: false,
        };
        this.SignIn(req);
      }
    });
  }

  SignIn(req: AuthRequestModel) {
    this.authService.SignIn(req).subscribe((resp: any) => {
      if (!resp.succeeded) {
        this.message.showErrorMessage('The username or password is incorrect!');
      } else {
        this.component.signinLoading = false;
        this.signInService.setToStorage(resp.data, req);
        this.signInService.navigateByRole(resp.data);
      }
    });
  }
}
