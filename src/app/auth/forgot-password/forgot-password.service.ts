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
    let email = structuredClone(this.component.request.email);
    if (this.component.selectedTab === 1) {
      email = 'gm_participant' + email;
    }
    else if(this.component.selectedTab === 2) {
      email = 'gm_youth_worker' + email;
    }
    this.authService.Exists(email).subscribe((resp) => {
      this.component.emailLoading = false;
      if (resp.data.exists) {
        this.sendCode(email);
      } else {
        this.message.showWarningMessage('User with given email does not exist');
      }
    });
  }

  sendCode(email:string) {
    const req = {
      source: email,
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
    let request = structuredClone(this.component.request);
    if (this.component.selectedTab === 1) {
      request.email = 'gm_participant' + request.email;
    }
    else if(this.component.selectedTab === 2) {
      request.email = 'gm_youth_worker' + request.email;
    }

    this.authService
      .ForgotPassword(request)
      .subscribe((resp) => {
        if (!resp) {
          this.component.recoverLoading = false;
          return;
        }
        let email = structuredClone(this.component.request.email);
        if (this.component.selectedTab === 1) {
          email = 'gm_participant' + email;
        }
        else if(this.component.selectedTab === 2) {
          email = 'gm_youth_worker' + email;
        }
        const req: AuthRequestModel = {
          username: email,
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
