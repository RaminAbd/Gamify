import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrganizationsRequestModel } from '../admin-organizations/shared/models/organizations-request.model';
import { OrganizationProfileService } from './organization-profile.service';

@Component({
  selector: 'app-organization-profile',
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './organization-profile.component.html',
  styleUrl: './organization-profile.component.scss',
})
export class OrganizationProfileComponent {
  private service: OrganizationProfileService = inject(
    OrganizationProfileService,
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
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    organizationId: ['', Validators.required],
    name: ['', Validators.required],
    country: ['', Validators.required],
    website: ['', Validators.required],
    socialMediaLink: ['', Validators.required],
    password: ['', Validators.required],
    logo: [''],
    repeatPass: ['', Validators.required],
  });

  constructor() {
    this.service.component = this;
    this.service.getOrganization();
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
    this.request.logo.fileLoading = true;
    this.service.getFile(e, (resp: any) => {
      this.request.logo.fileLoading = false;
      this.request.logo = resp.data;
      this.request.logo.fakeFile = null;
      this.request.logo.isValid = true;
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
      this.requestForm.valid &&
      this.request.logo.fileUrl &&
      this.request.password === this.request.repeatPassword
    ) {
      this.signinLoading = true;
      this.service.checkUserName();
    } else {
      this.service.message.showWarningMessage('Fields are not valid');
    }
  }
}
