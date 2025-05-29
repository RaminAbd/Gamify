import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkerSignupRequestModel } from '../worker-sign-up/shared/models/worker-signup-request.model';
import { NgIf } from '@angular/common';
import { ParticipantSignUpService } from './participant-sign-up.service';
import { ParticipantSignupRequestModel } from './shared/models/participant-signup-request.model';

@Component({
  selector: 'app-participant-sign-up',
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './participant-sign-up.component.html',
  styleUrl: './participant-sign-up.component.scss',
})
export class ParticipantSignUpComponent {
  private service: ParticipantSignUpService = inject(ParticipantSignUpService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  isSubmitted: boolean = false;
  passVisible: boolean = false;
  repeatPassVisible: boolean = false;
  signinLoading: boolean = false;
  private fb: FormBuilder = inject(FormBuilder);
  request: ParticipantSignupRequestModel = new ParticipantSignupRequestModel();
  groupWorkerId = this.route.snapshot.paramMap.get('id') as string;
  requestForm = this.fb.group({
    email: [
      { value: '', disabled: true },
      [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)],
    ],
    nickName: ['', Validators.required],
    password: ['', Validators.required],
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
      this.request.password === this.request.repeatPassword
    ) {
      this.service.checkUserName();
    } else {
      this.service.message.showWarningMessage('Fields are not valid');
    }
  }
}
