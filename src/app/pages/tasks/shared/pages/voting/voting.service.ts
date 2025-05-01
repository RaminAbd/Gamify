import {inject, Injectable} from '@angular/core';
import {VotingsApiService} from '../../../../participant-tasks/shared/services/votings.api.service';
import {ApplicationMessageCenterService} from '../../../../../core/services/ApplicationMessageCenter.service';
import {PVotingComponent} from '../../../../participant-tasks/shared/pages/p-voting/p-voting.component';
import {VotingComponent} from './voting.component';

@Injectable({
  providedIn: 'root'
})
export class VotingService {
  private service:VotingsApiService = inject(VotingsApiService)
  private message:ApplicationMessageCenterService = inject(ApplicationMessageCenterService)
  component:VotingComponent
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
