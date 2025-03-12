import { inject, Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthApiService } from '../../auth/shared/services/auth.api.service';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { ParticipantsApiService } from '../admin-participants/shared/services/participants.api.service';
import { ParticipantProfileComponent } from './participant-profile.component';
import { ParticipantSignupRequestModel } from '../../auth/participant-sign-up/shared/models/participant-signup-request.model';
import { OtpCodeComponent } from '../../auth/organization-sign-up/shared/components/otp-code/otp-code.component';
import { SelectAvatarComponent } from '../../components/select-avatar/select-avatar.component';

@Injectable({
  providedIn: 'root',
})
export class ParticipantProfileService {
  private service: ParticipantsApiService = inject(ParticipantsApiService);
  public dialogService: DialogService = inject(DialogService);
  private authService: AuthApiService = inject(AuthApiService);
  Copy: ParticipantSignupRequestModel = new ParticipantSignupRequestModel();
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: ParticipantProfileComponent;
  constructor() {}

  getGroupWorker() {
    let id = localStorage.getItem('id') as string;
    this.service.GetById(this.service.serviceUrl, id).subscribe((resp) => {
      this.component.request = resp.data;
      this.Copy = structuredClone(resp.data);
    });
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
