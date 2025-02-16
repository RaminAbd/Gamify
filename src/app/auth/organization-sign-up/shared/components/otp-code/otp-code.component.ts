import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApplicationMessageCenterService } from '../../../../../core/services/ApplicationMessageCenter.service';

@Component({
  selector: 'app-otp-code',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './otp-code.component.html',
  styleUrl: './otp-code.component.scss',
})
export class OtpCodeComponent {
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  code: number;
  isSubmitted: boolean = false;
  save() {
    this.isSubmitted = true;
    if (!this.code) {
      this.message.showWarningMessage('Please enter a valid code.');
    }
    else{
      this.ref.close(this.code);
    }
  }
}
