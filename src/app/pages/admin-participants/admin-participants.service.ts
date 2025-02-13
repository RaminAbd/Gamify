import {inject, Injectable} from '@angular/core';
import {AdminParticipantsComponent} from './admin-participants.component';
import {ParticipantsApiService} from './shared/services/participants.api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminParticipantsService {
  component: AdminParticipantsComponent;
  private service:ParticipantsApiService = inject(ParticipantsApiService)
  constructor() { }

  getAll() {
    this.service.GetAll(this.service.serviceUrl).subscribe((resp) => {
      this.component.participants = resp.data;
    });
  }

  setCols() {
    this.component.cols = [
      { field: 'image', header: 'Image' },
      { field: 'firstName', header: 'First name' },
      { field: 'lastName', header: 'Last name' },
      { field: 'email', header: 'Email' },
    ];
  }
}
