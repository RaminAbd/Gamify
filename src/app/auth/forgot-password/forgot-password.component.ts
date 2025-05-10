import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import { RouterLink } from '@angular/router';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotRequestModel } from './shared/models/forgot-request.model';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private service: ForgotPasswordService = inject(ForgotPasswordService);
  private fb: FormBuilder = inject(FormBuilder);
  requestForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
  });
  mainForm = this.fb.group({
    email: [
      { value: '', disabled: true },
      [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)],
    ],
    code: ['', Validators.required],
    password: ['', Validators.required],
    repeatPass: ['', Validators.required],
  });
  selectedTab = 1;
  showMainForm: boolean = false;
  firstSubmitted: boolean = false;
  isSubmitted: boolean = false;
  passVisible: boolean = false;
  repeatPassVisible: boolean = false;

  request: ForgotRequestModel = new ForgotRequestModel();
  emailLoading: boolean = false;
  recoverLoading: boolean = false;
  constructor() {
    this.service.component = this;
  }

  validateField(field: string) {
    return (
      this.mainForm.get(field)?.invalid &&
      (this.mainForm.get(field)?.dirty ||
        this.mainForm.get(field)?.touched ||
        this.isSubmitted)
    );
  }

  validateFirstField(field: string) {
    return (
      this.requestForm.get(field)?.invalid &&
      (this.requestForm.get(field)?.dirty ||
        this.requestForm.get(field)?.touched ||
        this.firstSubmitted)
    );
  }

  sendCode() {
    this.firstSubmitted = true;
    if (this.requestForm.valid) {
      this.service.checkUserName();
    } else {
      this.service.message.showWarningMessage('Mail is not valid');
    }
  }

  save() {
    this.firstSubmitted = false;
    this.isSubmitted = true;
    if (
      this.mainForm.valid &&
      this.request.password === this.request.repeatPass
    ) {
      this.recoverLoading = true;
      this.service.recoverPassword();
    } else {
      this.service.message.showWarningMessage('Fields are not valid');
    }
  }
}
