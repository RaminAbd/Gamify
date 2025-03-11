import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrganizationsRequestModel } from '../../pages/admin-organizations/shared/models/organizations-request.model';
import { OrganizationSignUpService } from './organization-sign-up.service';

@Component({
  selector: 'app-organization-sign-up',
  imports: [NgIf, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './organization-sign-up.component.html',
  styleUrl: './organization-sign-up.component.scss',
})
export class OrganizationSignUpComponent {
  private service: OrganizationSignUpService = inject(
    OrganizationSignUpService,
  );
  isSubmitted: boolean = false;
  passVisible: boolean = false;
  repeatPassVisible: boolean = false;
  requestSent: boolean = false;
  signinLoading: boolean = false;
  private fb: FormBuilder = inject(FormBuilder);
  request: OrganizationsRequestModel = new OrganizationsRequestModel();
  requestForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
    password: ['', Validators.required],
    repeatPass: ['', Validators.required],
  });

  constructor() {
    this.service.component = this;
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
    console.log(this.requestForm.value, 'requestFOrm', this.requestForm.valid);
    console.log(this.request);
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
