import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRequestModel } from '../shared/models/auth-request.model';
import { SignInService } from './sign-in.service';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [NgIf, ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  isSubmitted: boolean = false;
  passVisible: boolean = false;
  requestSent: boolean = false;
  signinLoading: boolean = false;
  private fb: FormBuilder = inject(FormBuilder);
  private service: SignInService = inject(SignInService);
  selectedTab = 1;
  constructor() {
    this.service.component = this;
    this.service.checkRememberMe();
  }

  requestForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false],
  });

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
    if (this.requestForm.valid) {
      var req: AuthRequestModel = structuredClone(
        this.requestForm.value,
      ) as AuthRequestModel;
      if (this.selectedTab === 1) {
        req.username = 'gm_participant' + req.username;
      }
      else if(this.selectedTab === 2) {
        req.username = 'gm_youth_worker' + req.username;
      }

      console.log(req);
      this.service.SignIn(req);
    }
  }
}
