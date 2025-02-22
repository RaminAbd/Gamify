import { Injectable } from '@angular/core';
import { BaseCrudApiService } from '../../../../../../../../../../core/services/base-crud.api.service';
import { HttpClient } from '@angular/common/http';
import { ApplicationMessageCenterService } from '../../../../../../../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class TaskRootsApiService extends BaseCrudApiService {
  serviceUrl = 'TaskRoots/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  getAllByProject(req: any) {
    return this.get(this.serviceUrl + 'get-all-by-project', null, req);
  }


}
