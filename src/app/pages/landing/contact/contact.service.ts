import { inject, Injectable } from '@angular/core';
import { ApplicationMessageCenterService } from '../../../core/services/ApplicationMessageCenter.service';
import { EmailsApiService } from './shared/services/emails.api.service';
import { ContactComponent } from './contact.component';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private emailsService: EmailsApiService = inject(EmailsApiService);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: ContactComponent;
  constructor() {}

  send() {
    this.emailsService
      .SendEmail(this.component.form.value)
      .subscribe((resp) => {
        if (resp.succeeded) {
          this.message.showSuccessMessage('Successfully created!');
          this.component.form.reset();
          this.component.isSubmitted = false;
        }
      });
  }
}
