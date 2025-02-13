import {Component, inject} from '@angular/core';
import {ParticipantsResponseModel} from './shared/models/participants-response.model';
import {AdminParticipantsService} from './admin-participants.service';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-admin-participants',
  imports: [
    TableComponent
  ],
  templateUrl: './admin-participants.component.html',
  styleUrl: './admin-participants.component.scss'
})
export class AdminParticipantsComponent {
  service:AdminParticipantsService = inject(AdminParticipantsService);
  participants:ParticipantsResponseModel[]=[]
  cols: any[] = [];

  constructor() {
    this.service.component = this;
    this.service.getAll();
    this.service.setCols();
  }
}
