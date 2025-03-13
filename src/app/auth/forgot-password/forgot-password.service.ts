import { inject, Injectable } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password.component';
import { OtpCodeComponent } from '../organization-sign-up/shared/components/otp-code/otp-code.component';
import { AuthApiService } from '../shared/services/auth.api.service';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { BlobService } from '../../core/services/blob.service';
import { VerificationsApiService } from '../shared/services/verifications.api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { AuthRequestModel } from '../shared/models/auth-request.model';
import { SignInService } from '../sign-in/sign-in.service';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  component: ForgotPasswordComponent;
  private authService: AuthApiService = inject(AuthApiService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  private blob = inject(BlobService);
  private verificationService = inject(VerificationsApiService);
  public dialogService: DialogService = inject(DialogService);
  private router: Router = inject(Router);
  public signInService: SignInService = inject(SignInService);
  constructor() {}

  checkUserName() {
    this.component.emailLoading = true;
    this.authService.Exists(this.component.request.email).subscribe((resp) => {
      if (resp.data.exists) {
        this.sendCode();
      } else {
        this.message.showWarningMessage('User with given email does not exist');
      }
    });
  }

  sendCode() {
    const req = {
      source: this.component.request.email,
    };
    this.verificationService.send(req).subscribe((resp) => {
      if (resp.succeeded) {
        this.component.emailLoading = false;
        this.component.showMainForm = true;
        // this.openUpsert();
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
        this.component.request.otpCode = e;
        this.component.showMainForm = true;
      }
    });
  }

  recoverPassword() {
    this.authService
      .ForgotPassword(this.component.request)
      .subscribe((resp) => {
        if (!resp) {
          this.component.recoverLoading = false;
          return;
        }
        const req: AuthRequestModel = {
          username: this.component.request.email,
          password: this.component.request.password,
          remember: false,
        };
        this.SignIn(req);
      });
  }

  SignIn(req: AuthRequestModel) {
    this.authService.SignIn(req).subscribe((resp: any) => {
      if (!resp.succeeded) {
        this.message.showErrorMessage('The username or password is incorrect!');
      } else {
        this.component.recoverLoading = false;
        this.signInService.setToStorage(resp.data, req);
        this.signInService.navigateByRole(resp.data);
      }
    });
  }
}
