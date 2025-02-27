import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WorkerSignupRequestModel } from './shared/models/worker-signup-request.model';
import { WorkerSignUpService } from './worker-sign-up.service';

@Component({
  selector: 'app-worker-sign-up',
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './worker-sign-up.component.html',
  styleUrl: './worker-sign-up.component.scss',
})
export class WorkerSignUpComponent {
  private service: WorkerSignUpService = inject(WorkerSignUpService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  isSubmitted: boolean = false;
  passVisible: boolean = false;
  repeatPassVisible: boolean = false;
  requestSent: boolean = false;
  signinLoading: boolean = false;
  private fb: FormBuilder = inject(FormBuilder);
  request: WorkerSignupRequestModel = new WorkerSignupRequestModel();
  groupWorkerId = this.route.snapshot.paramMap.get('id') as string;
  requestForm = this.fb.group({
    email: [
      { value: '', disabled: true },
      [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)],
    ],
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
    console.log(this.requestForm.value, 'requestFOrm', this.requestForm.valid);
    console.log(this.request);
    this.isSubmitted = true;
    if (
      this.requestForm.valid &&
      this.request.image.fileUrl &&
      this.request.password === this.request.repeatPassword
    ) {
      this.service.checkUserName();
    } else {
      this.service.message.showWarningMessage('Fields are not valid');
    }
  }
}
