import { Injectable } from '@angular/core';
import {BaseCrudApiService} from '../../../../core/services/base-crud.api.service';
import {HttpClient} from '@angular/common/http';
import {ApplicationMessageCenterService} from '../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root'
})
export class TaskQuizzesApiService  extends BaseCrudApiService {
  serviceUrl = 'TaskQuizzes/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  AnswerQuestions(req:any){
    return this.post(this.serviceUrl + 'answer-questions', req)
  }

  GetDetails(id:string){
    return this.get(this.serviceUrl + 'get-details/' , id);
  }
}
