import { inject, Injectable } from '@angular/core';
import { GroupWorkersApiService } from '../organization-projects/shared/pages/project-info/shared/pages/project-groups/shared/pages/project-groups-details/shared/services/group-workers.api.service';
import { InvitationsComponent } from './invitations.component';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class InvitationsService {
  protected service: GroupWorkersApiService = inject(GroupWorkersApiService);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: InvitationsComponent;
  constructor() {}

  getAll() {
    this.service.GetInvitations(this.component.id).subscribe((resp) => {
      this.component.invitations = resp.data;
      this.component.filteredList = structuredClone(resp.data);
    });
  }

  accept(id: string) {
    let req = {
      id: id,
    };
    this.service.Accept(req).subscribe((resp) => {
      if (resp.succeeded) {
        this.getAll();
        this.message.showSuccessMessage('Successfully accepted');
      }
    });
  }
}
