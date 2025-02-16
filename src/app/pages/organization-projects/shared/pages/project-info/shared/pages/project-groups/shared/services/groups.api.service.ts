import { Injectable } from '@angular/core';
import {BaseCrudApiService} from '../../../../../../../../../../core/services/base-crud.api.service';
import {HttpClient} from '@angular/common/http';
import {
  ApplicationMessageCenterService
} from '../../../../../../../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsApiService extends BaseCrudApiService {
  serviceUrl = 'Groups/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  GetAllByProject(id:string){
    return this.get(this.serviceUrl + 'get-all-by-project/', id);
  }
}
