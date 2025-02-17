import { Component, inject } from '@angular/core';
import { NgForOf, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupWorkersService } from '../group-workers/group-workers.service';
import { ActivatedRoute } from '@angular/router';
import { GroupInvitedMenResponseModel } from '../../models/group-invited-men-response.model';
import { GroupParticipantsService } from './group-participants.service';
import { ApplicationMessageCenterService } from '../../../../../../../../../../../../../../core/services/ApplicationMessageCenter.service';
import { Confirmation } from '../../../../../../../../../../../../../../core/extensions/confirmation';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-group-participants',
  imports: [NgForOf, ReactiveFormsModule, FormsModule, NgStyle],
  templateUrl: './group-participants.component.html',
  styleUrl: './group-participants.component.scss',
})
export class GroupParticipantsComponent {
  private service: GroupParticipantsService = inject(GroupParticipantsService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  groupId: string = this.route.parent?.snapshot.paramMap.get('id') as string;
  groupParticipants: GroupInvitedMenResponseModel[] = [];
  searchText: string;
  filteredList: GroupInvitedMenResponseModel[] = [];
  private confirmationService: ConfirmationService =
    inject(ConfirmationService);
  constructor() {
    this.service.component = this;
    this.service.getParticipants();
  }
  searchByName() {
    this.filteredList = this.groupParticipants.filter((obj) =>
      obj.email.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }
  openInvitation() {
    this.service.open();
  }

  remove(id: string): void {
    Confirmation.confirm(
      this.confirmationService,
      'Are you sure you want to delete this group participant?',
      () => {
        this.service.removeGroupMember(id);
      },
    );
  }
}
