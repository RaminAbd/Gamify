import {inject, Injectable} from '@angular/core';
import {VotingsApiService} from '../../services/votings.api.service';
import {PVotingComponent} from './p-voting.component';
import {ApplicationMessageCenterService} from '../../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root'
})
export class PVotingService {
  private service:VotingsApiService = inject(VotingsApiService)
  private message:ApplicationMessageCenterService = inject(ApplicationMessageCenterService)
  component:PVotingComponent
  constructor() { }

  getVoting() {
    this.service.GetById(this.service.serviceUrl, this.component.id).subscribe(resp=>{
      this.component.response = resp.data;
    })
  }

  vote(id:string) {
    console.log(this.component.response);
    console.log(id);
    const req = {
      taskId:this.component.response.taskId,
      voteTo:id
    }

    this.service.Vote(req).subscribe(resp=>{
      this.message.showSuccessMessage('Successfully voted');
      this.getVoting();
    })
  }
}
