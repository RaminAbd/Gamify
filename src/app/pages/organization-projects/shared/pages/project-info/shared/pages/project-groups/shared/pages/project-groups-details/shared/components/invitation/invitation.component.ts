import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApplicationMessageCenterService } from '../../../../../../../../../../../../../../core/services/ApplicationMessageCenter.service';
import { NgForOf } from '@angular/common';
import { GroupInvitedMenResponseModel } from '../../models/group-invited-men-response.model';

@Component({
  selector: 'app-invitation',
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss',
})
export class InvitationComponent {
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  private fb: FormBuilder = inject(FormBuilder);
  public message = inject(ApplicationMessageCenterService);
  email: string;
  isSubmitted: boolean = false;
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
  });
  people: GroupInvitedMenResponseModel[] = this.config.data;
  selectedEmails: string[] = [];

  add() {
    if (this.form.valid) {
      let includesNew = this.selectedEmails.some((x: any) => x === this.email);
      let includesOld = this.people.some((x: any) => x.email === this.email);
      if (!includesNew && !includesOld) {
        this.selectedEmails.push(this.email);
        this.email = '';
        this.form.reset();
      } else {
        this.message.showWarningMessage(
          'Person with given email already exists',
        );
      }
    } else {
      this.message.showWarningMessage('Email is not valid');
    }
  }

  save() {
    this.isSubmitted = true;
    if (this.selectedEmails.length > 0) {
      this.ref.close(this.selectedEmails);
    } else {
      this.message.showWarningMessage('Invitation list is empty');
    }
  }

  delete(i: number) {
    this.selectedEmails.splice(i, 1);
  }
}
