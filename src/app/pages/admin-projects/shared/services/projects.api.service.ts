import { Injectable } from '@angular/core';
import { BaseCrudApiService } from '../../../../core/services/base-crud.api.service';
import { HttpClient } from '@angular/common/http';
import { ApplicationMessageCenterService } from '../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsApiService extends BaseCrudApiService {
  serviceUrl = 'Projects/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  GetAllByOrganization(id: string) {
    return this.get(this.serviceUrl + 'get-all-by-organization/', id);
  }

  GetAllByWorker(id: string) {
    return this.get(this.serviceUrl + 'get-all-by-worker/', id);
  }

  GetAllByParticipant(id: string) {
    return this.get(this.serviceUrl + 'get-all-by-participant/', id);
  }
  getDetailsByWorker(req:any) {
    return this.get(this.serviceUrl + 'get-details-for-worker', null, req);
  }
  getDetailsByParticipant(req:any) {
    return this.get(this.serviceUrl + 'get-details-for-participant', null, req);
  }
}
