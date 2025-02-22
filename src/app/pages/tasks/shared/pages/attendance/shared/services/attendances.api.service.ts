import { Injectable } from '@angular/core';
import {BaseCrudApiService} from '../../../../../../../core/services/base-crud.api.service';
import {HttpClient} from '@angular/common/http';
import {ApplicationMessageCenterService} from '../../../../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root'
})
export class AttendancesApiService  extends BaseCrudApiService {
  serviceUrl = 'Attendances/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  Scan(req:any){
    return this.post(this.serviceUrl + 'scan', req);
  }
}
