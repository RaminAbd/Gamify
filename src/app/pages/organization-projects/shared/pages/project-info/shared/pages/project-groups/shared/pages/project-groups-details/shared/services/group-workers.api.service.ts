import { Injectable } from '@angular/core';
import { BaseCrudApiService } from '../../../../../../../../../../../../../core/services/base-crud.api.service';
import { HttpClient } from '@angular/common/http';
import { ApplicationMessageCenterService } from '../../../../../../../../../../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class GroupWorkersApiService extends BaseCrudApiService {
  serviceUrl = 'GroupWorkers/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  GetAllByGroup(id: string) {
    return this.get(this.serviceUrl + 'get-all-by-group/', id);
  }

  Invite(req: any) {
    return this.post(this.serviceUrl + 'invite', req);
  }

  GetInvitations(id: string) {
    return this.get(this.serviceUrl + 'get-invitations/', id);
  }

  Accept(req: any) {
    return this.post(this.serviceUrl + 'accept-invitation', req);
  }
}
