import { inject, Injectable } from '@angular/core';
import { OrganizationsApiService } from '../admin-organizations/shared/services/organizations.api.service';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { BlobService } from '../../core/services/blob.service';
import { OrganizationProfileComponent } from './organization-profile.component';
import { OrganizationsRequestModel } from '../admin-organizations/shared/models/organizations-request.model';
import { OtpCodeComponent } from '../../auth/organization-sign-up/shared/components/otp-code/otp-code.component';
import { VerificationsApiService } from '../../auth/shared/services/verifications.api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { SignInService } from '../../auth/sign-in/sign-in.service';
import { AuthApiService } from '../../auth/shared/services/auth.api.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationProfileService {
  private service: OrganizationsApiService = inject(OrganizationsApiService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  private blob = inject(BlobService);
  private verificationService = inject(VerificationsApiService);
  public dialogService: DialogService = inject(DialogService);
  private authService: AuthApiService = inject(AuthApiService);
  OrganizationCopy: OrganizationsRequestModel = new OrganizationsRequestModel();
  component: OrganizationProfileComponent;
  constructor() {}

  getOrganization() {
    let id = localStorage.getItem('id') as string;
    this.service.GetById(this.service.serviceUrl, id).subscribe((resp) => {
      console.log(resp.data);
      this.component.request = resp.data;
      this.OrganizationCopy = structuredClone(resp.data);
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
        this.sendCode();
      }
    });
  }

  sendCode() {
    const req = {
      source: this.component.request.email,
    };
    this.verificationService.send(req).subscribe((resp) => {
      if (resp.succeeded) {
        this.component.signinLoading = false;
        this.openUpsert();
      }
    });
  }

  openUpsert() {
    const ref = this.dialogService.open(OtpCodeComponent, {
      header: 'Otp Code',
      width: '355px',
      style: {
        maxWidth: '95%',
      },
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        this.component.signinLoading = true;
        this.component.request.otpCode = e;
        this.update();
      }
    });
  }

  update() {
    this.service
      .Update(this.service.serviceUrl, this.component.request)
      .subscribe((resp) => {
        if (resp.succeeded) {
          this.changeEmail();
        }
      });
  }

  private changeEmail() {
    this.service.ChangeEmail(this.component.request).subscribe((resp) => {
      this.getOrganization();
      this.component.signinLoading = false;
    });
  }
}
