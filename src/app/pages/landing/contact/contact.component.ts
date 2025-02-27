import {Component, inject, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ApplicationMessageCenterService} from '../../../core/services/ApplicationMessageCenter.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private appMessage:ApplicationMessageCenterService = inject(ApplicationMessageCenterService);
  form = {
    name:'',
    email:'',
    subject:'',
    message:'',
  }

  sendMessage() {
    this.form = {
      name:'',
      email:'',
      subject:'',
      message:'',
    }
    this.appMessage.showSuccessMessage('Successfully sent!')
  }
}
