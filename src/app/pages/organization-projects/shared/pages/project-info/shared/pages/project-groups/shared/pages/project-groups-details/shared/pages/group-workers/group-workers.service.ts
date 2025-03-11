import { inject, Injectable } from '@angular/core';
import { GroupWorkersApiService } from '../../services/group-workers.api.service';
import { GroupWorkersComponent } from './group-workers.component';
import { DialogService } from 'primeng/dynamicdialog';
import { InvitationComponent } from '../../components/invitation/invitation.component';
import { ApplicationMessageCenterService } from '../../../../../../../../../../../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class GroupWorkersService {
  private workersService: GroupWorkersApiService = inject(
    GroupWorkersApiService,
  );
  public dialogService: DialogService = inject(DialogService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: GroupWorkersComponent;
  constructor() {}

  getWorkers() {
    this.workersService
      .GetAllByGroup(this.component.groupId)
      .subscribe((resp) => {
        this.component.groupWorkers = resp.data;
        this.component.filteredList = structuredClone(resp.data);
      });
  }

  open() {
    const ref = this.dialogService.open(InvitationComponent, {
      header: 'Add worker',
      width: '800px',
      data: this.component.groupWorkers,
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
    this.workersService.Invite(req).subscribe((resp) => {
      this.getWorkers();
    });
  }

  removeGroupMember(id: string) {
    this.workersService
      .Delete(this.workersService.serviceUrl, id)
      .subscribe((resp) => {
        this.getWorkers();
      });
  }
}
