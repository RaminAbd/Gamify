import {inject, Injectable} from '@angular/core';
import {ProjectGroupsComponent} from './project-groups.component';
import {DialogService} from 'primeng/dynamicdialog';
import {GroupUpsertComponent} from './shared/components/group-upsert/group-upsert.component';
import {GroupsApiService} from './shared/services/groups.api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectGroupsService {
  private service:GroupsApiService = inject(GroupsApiService);
  public dialogService: DialogService = inject(DialogService);
  component:ProjectGroupsComponent;
  constructor() { }

  getGroups() {
    this.service.GetAllByProject(this.component.id).subscribe((resp) => {
      this.component.groups = resp.data;
      this.component.filteredList = structuredClone(resp.data);
    });
  }

  openDialog() {
    const ref = this.dialogService.open(GroupUpsertComponent, {
      header: 'Group',
      width: '460px',
      data: '',
      style: {
        maxWidth: '95%',
      },
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        // this.topic = e;
        console.log(e)
      }
    });
  }
}
