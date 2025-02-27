import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ApplicationMessageCenterService} from '../../../core/services/ApplicationMessageCenter.service';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {
  private messageService:ApplicationMessageCenterService = inject(ApplicationMessageCenterService)
  email: any;
  subscribe(){
    console.log(this.email);
    if(this.email){
      this.email = '';
      this.messageService.showSuccessMessage('Successfully sent!')
    }
  }
}
