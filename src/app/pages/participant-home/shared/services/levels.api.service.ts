import { Injectable } from '@angular/core';
import {BaseCrudApiService} from '../../../../core/services/base-crud.api.service';
import {HttpClient} from '@angular/common/http';
import {ApplicationMessageCenterService} from '../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root'
})
export class LevelsApiService extends BaseCrudApiService {
  serviceUrl = 'Levels/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  GetParticipantLevel(req:any){
    return this.get(this.serviceUrl + 'get-participant-level',null,  req)
  }

  GetWorkerLevel(req:any){
    return this.get(this.serviceUrl + 'get-worker-level',null,  req)
  }

  GetAllByProject(id:string){
    return this.get(this.serviceUrl + 'getAll/', id)
  }
}
