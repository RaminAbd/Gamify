import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { GroupsResponseModel } from './shared/models/groups-response.model';
import { ProjectGroupsService } from './project-groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Popover } from 'primeng/popover';
import { Confirmation } from '../../../../../../../../core/extensions/confirmation';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-project-groups',
  imports: [FormsModule, NgForOf, Popover],
  templateUrl: './project-groups.component.html',
  styleUrl: './project-groups.component.scss',
})
export class ProjectGroupsComponent {
  private service: ProjectGroupsService = inject(ProjectGroupsService);
  private router: Router = inject(Router);
  groups: GroupsResponseModel[] = [];
  filteredList: GroupsResponseModel[] = [];
  searchText: string;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private confirmation: ConfirmationService = inject(ConfirmationService);
  id = this.route.parent?.snapshot.paramMap.get('id') as string;
  selectedGroup: GroupsResponseModel = new GroupsResponseModel();
  constructor() {
    this.service.component = this;
    this.service.getGroups();
  }

  searchByName() {
    this.filteredList = this.groups.filter((obj) =>
      obj.name.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  openDialog() {
    this.service.openDialog('create');
  }

  getGroupItem(item: GroupsResponseModel) {
    console.log(item);
    this.router.navigate([
      'main/organization/projects/',
      this.id,
      'groups',
      item.id,
    ]);
  }

  openToolbar(item: GroupsResponseModel) {
    this.selectedGroup = structuredClone(item);
  }

  deleteGroup() {
    Confirmation.confirm(
      this.confirmation,
      'Are you sure you want to delete this group?',
      () => {
        this.service.deleteTopic();
      },
    );
  }

  editGroup() {
   this.service.getItem()
  }
}
