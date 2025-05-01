import {Component, inject} from '@angular/core';
import {PVotingService} from '../../../../participant-tasks/shared/pages/p-voting/p-voting.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {VotingResponseModel} from '../../../../participant-tasks/shared/models/voting-response.model';
import {Confirmation} from '../../../../../core/extensions/confirmation';
import {NgForOf, NgIf} from '@angular/common';
import {VotingService} from './voting.service';

@Component({
  selector: 'app-voting',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss'
})
export class VotingComponent {
  private service: VotingService = inject(VotingService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected confirmation: ConfirmationService = inject(ConfirmationService);
  private router: Router = inject(Router);
  id = this.route.snapshot.paramMap.get('id') as string;
  response: VotingResponseModel = new VotingResponseModel();
  constructor() {
    this.service.component = this;
    this.service.getVoting()
  }

  vote(id: string) {
    Confirmation.confirm(
      this.confirmation,
      'Are you sure you want to vote for this candidate?',
      () => {
        this.service.vote(id);
      },
    );
  }
}
