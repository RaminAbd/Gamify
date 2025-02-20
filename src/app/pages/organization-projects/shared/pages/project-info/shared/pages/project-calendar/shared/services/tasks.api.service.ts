import { Injectable } from '@angular/core';
import { BaseCrudApiService } from '../../../../../../../../../../core/services/base-crud.api.service';
import { HttpClient } from '@angular/common/http';
import { ApplicationMessageCenterService } from '../../../../../../../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService extends BaseCrudApiService {
  serviceUrl = 'Tasks/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  getAllByRoot(id: string) {
    return this.get(this.serviceUrl + 'get-all-by-root/', id);
  }
}
