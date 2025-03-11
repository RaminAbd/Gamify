import { inject, Injectable } from '@angular/core';
import { OrganizationsApiService } from '../../pages/admin-organizations/shared/services/organizations.api.service';
import { OrganizationSignUpComponent } from './organization-sign-up.component';
import { AuthApiService } from '../shared/services/auth.api.service';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { BlobService } from '../../core/services/blob.service';
import { VerificationsApiService } from '../shared/services/verifications.api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { OtpCodeComponent } from './shared/components/otp-code/otp-code.component';
import { AuthRequestModel } from '../shared/models/auth-request.model';
import { SignInService } from '../sign-in/sign-in.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationSignUpService {
  private service: OrganizationsApiService = inject(OrganizationsApiService);
  private authService: AuthApiService = inject(AuthApiService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  private blob = inject(BlobService);
  private verificationService = inject(VerificationsApiService);
  public dialogService: DialogService = inject(DialogService);
  public signInService: SignInService = inject(SignInService);
  component: OrganizationSignUpComponent;
  constructor() {}



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
