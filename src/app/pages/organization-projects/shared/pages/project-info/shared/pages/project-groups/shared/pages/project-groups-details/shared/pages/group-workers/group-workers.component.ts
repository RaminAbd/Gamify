import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupWorkersService } from './group-workers.service';
import { GroupInvitedMenResponseModel } from '../../models/group-invited-men-response.model';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgStyle } from '@angular/common';
import { Confirmation } from '../../../../../../../../../../../../../../core/extensions/confirmation';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-group-workers',
  imports: [FormsModule, NgForOf, NgStyle],
  templateUrl: './group-workers.component.html',
  styleUrl: './group-workers.component.scss',
})
export class GroupWorkersComponent {
  private service: GroupWorkersService = inject(GroupWorkersService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  groupId: string = this.route.parent?.snapshot.paramMap.get('id') as string;
  groupWorkers: GroupInvitedMenResponseModel[] = [];
  searchText: string;
  filteredList: GroupInvitedMenResponseModel[] = [];
  private confirmationService: ConfirmationService =
    inject(ConfirmationService);
  constructor() {
    this.service.component = this;
    this.service.getWorkers();
  }
  searchByName() {
    this.filteredList = this.groupWorkers.filter((obj) =>
      obj.email.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }
  openInvitation() {
    this.service.open();
  }

  remove(id: string): void {
    Confirmation.confirm(this.confirmationService, 'Are you sure you want to delete this group worker?', () => {
      this.service.removeGroupMember(id);
    });
  }
}
