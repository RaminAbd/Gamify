import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { WorkerProfileService } from '../worker-profile/worker-profile.service';
import { WorkerSignupRequestModel } from '../../auth/worker-sign-up/shared/models/worker-signup-request.model';
import { ParticipantSignupRequestModel } from '../../auth/participant-sign-up/shared/models/participant-signup-request.model';
import { ParticipantProfileService } from './participant-profile.service';

@Component({
  selector: 'app-participant-profile',
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './participant-profile.component.html',
  styleUrl: './participant-profile.component.scss',
})
export class ParticipantProfileComponent {
  private service: ParticipantProfileService = inject(
    ParticipantProfileService,
  );
  isSubmitted: boolean = false;
  passVisible: boolean = false;
  repeatPassVisible: boolean = false;
  signinLoading: boolean = false;
  private fb: FormBuilder = inject(FormBuilder);
  request: ParticipantSignupRequestModel = new ParticipantSignupRequestModel();
  requestForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
    image: [''],
    repeatPass: ['', Validators.required],
  });

  constructor() {
    this.service.component = this;
    this.service.getGroupWorker();
  }

  validateField(field: string) {
    return (
      this.requestForm.get(field)?.invalid &&
      (this.requestForm.get(field)?.dirty ||
        this.requestForm.get(field)?.touched ||
        this.isSubmitted)
    );
  }

  Action() {
    this.isSubmitted = true;
    if (
      this.requestForm.valid &&
      this.request.image.fileUrl &&
      this.request.password === this.request.repeatPassword
    ) {
      this.signinLoading = true;
      if (this.service.Copy.email !== this.request.email) {
        console.log(this.service.Copy.email, this.request.email);
        this.service.checkUserName();
      } else {
        this.service.update();
      }
    } else {
      this.service.message.showWarningMessage('Fields are not valid');
    }
  }

  openAvatars() {
    this.service.openAvatars()
  }
}
