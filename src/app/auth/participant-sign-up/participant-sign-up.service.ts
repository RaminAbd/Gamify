import { inject, Injectable } from '@angular/core';
import { AuthApiService } from '../shared/services/auth.api.service';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { BlobService } from '../../core/services/blob.service';
import { SignInService } from '../sign-in/sign-in.service';
import { AuthRequestModel } from '../shared/models/auth-request.model';
import { ParticipantSignUpComponent } from './participant-sign-up.component';
import { GroupParticipantsApiService } from '../../pages/organization-projects/shared/pages/project-info/shared/pages/project-groups/shared/pages/project-groups-details/shared/services/group-participants.api.service';
import { ParticipantsApiService } from '../../pages/admin-participants/shared/services/participants.api.service';

@Injectable({
  providedIn: 'root',
})
export class ParticipantSignUpService {
  // 4803ed03-7590-4f68-a53b-5ff84f803b7c
  private groupParticipantsService: GroupParticipantsApiService = inject(
    GroupParticipantsApiService,
  );
  private service: ParticipantsApiService = inject(ParticipantsApiService);
  private authService: AuthApiService = inject(AuthApiService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  private blob = inject(BlobService);
  public signInService: SignInService = inject(SignInService);
  component: ParticipantSignUpComponent;
  constructor() {}

  getGroupWorker() {
    this.groupParticipantsService
      .GetById(
        this.groupParticipantsService.serviceUrl,
        this.component.groupWorkerId,
      )
      .subscribe((resp) => {
        this.component.request.email = resp.data.email;
        this.component.request.groupParticipantId = resp.data.id;
      });
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
