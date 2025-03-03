import {Component, inject} from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InvitationsService} from '../invitations/invitations.service';
import {ParticipantInvitationsService} from './participant-invitations.service';

@Component({
  selector: 'app-participant-invitations',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgStyle
  ],
  templateUrl: './participant-invitations.component.html',
  styleUrl: './participant-invitations.component.scss'
})
export class ParticipantInvitationsComponent {
  private service: ParticipantInvitationsService = inject(ParticipantInvitationsService);
  id: string = localStorage.getItem('id') as string;
  invitations: any[] = [];
  searchText: string;
  filteredList: any[] = [];
  constructor() {
    this.service.component = this;
    this.service.getAll();
  }
  searchByName() {
    this.filteredList = this.invitations.filter((obj) =>
      obj.email.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  accept(id: any) {
    this.service.accept(id);
  }
}
