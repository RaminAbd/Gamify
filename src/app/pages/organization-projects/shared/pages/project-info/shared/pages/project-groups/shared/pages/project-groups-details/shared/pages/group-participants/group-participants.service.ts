import { inject, Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ApplicationMessageCenterService } from '../../../../../../../../../../../../../../core/services/ApplicationMessageCenter.service';
import { InvitationComponent } from '../../components/invitation/invitation.component';
import { GroupParticipantsApiService } from '../../services/group-participants.api.service';
import { GroupParticipantsComponent } from './group-participants.component';

@Injectable({
  providedIn: 'root',
})
export class GroupParticipantsService {
  private participantsService: GroupParticipantsApiService = inject(
    GroupParticipantsApiService,
  );
  public dialogService: DialogService = inject(DialogService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: GroupParticipantsComponent;
  constructor() {}

  getParticipants() {
    this.participantsService
      .GetAllByGroup(this.component.groupId)
      .subscribe((resp) => {
        this.component.groupParticipants = resp.data;
        this.component.filteredList = structuredClone(resp.data);
      });
  }

  open() {
    const ref = this.dialogService.open(InvitationComponent, {
      header: 'Add participant',
      width: '800px',
      data: this.component.groupParticipants,
      style: {
        maxWidth: '95%',
      },
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        let req = {
          groupId: this.component.groupId,
          emails: e,
        };
        this.invite(req);
      }
    });
  }

  private invite(req: any) {
    this.participantsService.Invite(req).subscribe((resp) => {
      this.getParticipants();
    });
  }

  removeGroupMember(id: string) {
    this.participantsService
      .Delete(this.participantsService.serviceUrl, id)
      .subscribe((resp) => {
        this.getParticipants();
      });
  }
}
