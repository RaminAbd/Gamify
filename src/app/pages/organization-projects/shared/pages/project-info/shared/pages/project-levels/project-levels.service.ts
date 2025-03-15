import { inject, Injectable } from '@angular/core';
import { LevelsApiService } from '../../../../../../../participant-home/shared/services/levels.api.service';
import { ProjectLevelsComponent } from './project-levels.component';
import { Confirmation } from '../../../../../../../../core/extensions/confirmation';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { GroupsResponseModel } from '../project-groups/shared/models/groups-response.model';
import { GroupUpsertComponent } from '../project-groups/shared/components/group-upsert/group-upsert.component';
import { DialogService } from 'primeng/dynamicdialog';
import {LevelUpsertComponent} from './shared/components/level-upsert/level-upsert.component';

@Injectable({
  providedIn: 'root',
})
export class ProjectLevelsService {
  private service: LevelsApiService = inject(LevelsApiService);
  private router: Router = inject(Router);
  private confirmationService: ConfirmationService =
    inject(ConfirmationService);
  public dialogService: DialogService = inject(DialogService);
  component: ProjectLevelsComponent;
  constructor() {}


  getAll() {
    this.service.GetAllByProject(this.component.id).subscribe((resp) => {
      this.component.levels = resp.data.map((item:any) => ({
        ...item,
        type:item.type === 1 ? 'Participant' : 'Worker',
      }));
    });
  }

  setCols() {
    this.component.cols = [
      { field: 'name', header: 'Name' },
      { field: 'type', header: 'Type' },
      { field: 'fromPoints', header: 'From Points' },
      { field: 'toPoints', header: 'To Points' },
      { field: 'crudActions', header: 'Actions' },
    ];
  }

  tableActionHandler(e: any) {
    // /main/organization/projects/099f46fd-a339-4bfe-a084-14cad9b6b51c/edit
    switch (e.type) {
      case 1:
        this.openDialog()
        break;
      case 2:
        this.getItem(e.data.id)
        break;
      case 3:
        this.confirm(e.data.id);
        break;
    }
  }

  confirm(id: string) {
    Confirmation.confirm(
      this.confirmationService,
      'Are you sure you want to delete this group project?',
      () => {
        this.delete(id);
      },
    );
  }

  private delete(id: string) {
    this.service.Delete(this.service.serviceUrl, id).subscribe((resp) => {
      this.getAll();
    });
  }

  openDialog(data?:any) {
    const ref = this.dialogService.open(LevelUpsertComponent, {
      header: 'Level',
      width: '460px',
      data: {
        data:data,
        projectId:this.component.id
      },
      style: {
        maxWidth: '95%',
      },
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        this.getAll();
      }
    });
  }

  private getItem(id:string) {
    this.service.GetById(this.service.serviceUrl, id).subscribe((resp) => {
      this.openDialog(resp.data);
    })
  }
}
