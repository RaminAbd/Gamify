import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { WorkerProfileService } from './worker-profile.service';
import { WorkerSignupRequestModel } from '../../auth/worker-sign-up/shared/models/worker-signup-request.model';

@Component({
  selector: 'app-worker-profile',
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './worker-profile.component.html',
  styleUrl: './worker-profile.component.scss',
})
export class WorkerProfileComponent {
  private service: WorkerProfileService = inject(WorkerProfileService);
  isSubmitted: boolean = false;
  passVisible: boolean = false;
  repeatPassVisible: boolean = false;
  signinLoading: boolean = false;
  private fb: FormBuilder = inject(FormBuilder);
  request: WorkerSignupRequestModel = new WorkerSignupRequestModel();
  requestForm = this.fb.group({
    email: [
      { value: '', disabled: true },
      [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)],
    ],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: [''],
    image: [''],
    repeatPass: [''],
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

  getFile(e: any) {
    this.request.image.fileLoading = true;
    this.service.getFile(e, (resp: any) => {
      this.request.image.fileLoading = false;
      this.request.image = resp.data;
      this.request.image.fakeFile = null;
      this.request.image.isValid = true;
    });
  }

  getFileName(fileName: string): string {
    if (fileName) {
      if (fileName.length > 30) {
        return this.changeFileName(fileName);
      } else {
        return fileName;
      }
    } else {
      return '';
    }
  }

  changeFileName(name: string) {
    return (
      name.substring(0, 10) +
      '...' +
      name.substring(name.length - 5, name.length)
    );
  }

  Action() {
    this.isSubmitted = true;
    if (
      this.requestForm.valid
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
    this.service.openAvatars();
  }
}
