import { Injectable } from '@angular/core';
import {BaseCrudApiService} from '../../../../core/services/base-crud.api.service';
import {HttpClient} from '@angular/common/http';
import {ApplicationMessageCenterService} from '../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root'
})
export class PerformancesApiService extends BaseCrudApiService {
  serviceUrl = 'Performances/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }
  AddFile(req:any){
    return this.post(this.serviceUrl + 'add-file', req);
  }

  RemoveFile(req:any){
    return this.post(this.serviceUrl + 'remove-file', req);
  }
}
