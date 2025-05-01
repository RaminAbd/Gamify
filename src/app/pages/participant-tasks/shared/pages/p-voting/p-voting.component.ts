import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PVotingService } from './p-voting.service';
import { VotingResponseModel } from '../../models/voting-response.model';
import {NgForOf, NgIf} from '@angular/common';
import {Confirmation} from '../../../../../core/extensions/confirmation';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-p-voting',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './p-voting.component.html',
  styleUrl: './p-voting.component.scss',
})
export class PVotingComponent {
  private service: PVotingService = inject(PVotingService);
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
