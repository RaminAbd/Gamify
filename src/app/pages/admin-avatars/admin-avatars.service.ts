import { inject, Injectable } from '@angular/core';
import { AdminAvatarsComponent } from './admin-avatars.component';
import { AvatarsApiService } from './shared/services/avatars.api.service';
import { Router } from '@angular/router';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminAvatarUpsertComponent } from './shared/components/admin-avatar-upsert/admin-avatar-upsert.component';

@Injectable({
  providedIn: 'root',
})
export class AdminAvatarsService {
  component: AdminAvatarsComponent;
  private service: AvatarsApiService = inject(AvatarsApiService);
  private router: Router = inject(Router);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  public dialogService: DialogService = inject(DialogService);
  constructor() {}

  getAll() {
    this.service.GetAll(this.service.serviceUrl).subscribe((resp) => {
      this.component.avatars = resp.data.map((avatar: any, i: number) => ({
        id: avatar.id,
        image: avatar.image.fileUrl,
        name: 'Avatar ' + i,
      }));
    });
  }

  setCols() {
    this.component.cols = [
      { field: 'image', header: 'Image' },
      { field: 'name', header: 'Name' },
      { field: 'crudActions', header: 'Actions' },
    ];
  }

  tableActionHandler(e: any) {
    switch (e.type) {
      case 1:
        this.openUpsert('create');
        break;
      case 2:
        this.openUpsert(e.data.id);
        break;
      case 3:
        this.delete(e.data.id);
        break;
    }
  }

  private delete(id: string) {
    this.service.Delete(this.service.serviceUrl, id).subscribe((resp) => {
      if (resp.succeeded) {
        this.message.showSuccessMessage('Successfully deleted');
        this.getAll();
      }
    });
  }

  openUpsert(id: string) {
    const ref = this.dialogService.open(AdminAvatarUpsertComponent, {
      header: 'Add avatar',
      width: '460px',
      data: id,
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
}
