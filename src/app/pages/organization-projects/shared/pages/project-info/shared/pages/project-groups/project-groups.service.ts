import { inject, Injectable } from '@angular/core';
import { ProjectGroupsComponent } from './project-groups.component';
import { DialogService } from 'primeng/dynamicdialog';
import { GroupUpsertComponent } from './shared/components/group-upsert/group-upsert.component';
import { GroupsApiService } from './shared/services/groups.api.service';
import { ApplicationMessageCenterService } from '../../../../../../../../core/services/ApplicationMessageCenter.service';
import { GroupsResponseModel } from './shared/models/groups-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectGroupsService {
  private service: GroupsApiService = inject(GroupsApiService);
  public dialogService: DialogService = inject(DialogService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: ProjectGroupsComponent;
  constructor() {}

  getGroups() {
    this.service.GetAllByProject(this.component.id).subscribe((resp) => {
      this.component.groups = resp.data;
      this.component.filteredList = structuredClone(resp.data);
    });
  }

  openDialog(groupId: string, group?: GroupsResponseModel) {
    const ref = this.dialogService.open(GroupUpsertComponent, {
      header: 'Group',
      width: '460px',
      data: group,
      style: {
        maxWidth: '95%',
      },
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        const req: any = {
          projectId: this.component.id,
          name: e.name,
          image: e.image,
        };
        if (groupId === 'create') this.create(req);
        else {
          req.id = groupId;
          this.update(req);
        }
      }
    });
  }

  deleteTopic() {
    this.service
      .Delete(this.service.serviceUrl, this.component.selectedGroup.id)
      .subscribe((resp) => {
        this.message.showSuccessMessage('Successfully deleted');
        this.getGroups();
      });
  }

  private create(req: any) {
    this.service.Create(this.service.serviceUrl, req).subscribe((resp) => {
      if (resp.succeeded) {
        this.message.showSuccessMessage('Successfully created');
        this.getGroups();
      }
    });
  }

  private update(req: any) {
    this.service.Update(this.service.serviceUrl, req).subscribe((resp) => {
      if (resp.succeeded) {
        this.message.showSuccessMessage('Successfully updated');
        this.getGroups();
      }
    });
  }

  getItem() {
    this.service
      .GetById(this.service.serviceUrl, this.component.selectedGroup.id)
      .subscribe((resp) => {
        this.openDialog(this.component.selectedGroup.id, resp.data);
      });
  }
}
