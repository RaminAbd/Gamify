import { inject, Injectable } from '@angular/core';
import { BlobService } from '../../../../../core/services/blob.service';
import { AdminAvatarUpsertComponent } from './admin-avatar-upsert.component';
import { AvatarsApiService } from '../../services/avatars.api.service';
import { ApplicationMessageCenterService } from '../../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAvatarUpsertService {
  private blob = inject(BlobService);
  private service: AvatarsApiService = inject(AvatarsApiService);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: AdminAvatarUpsertComponent;
  constructor() {}

  getInfo() {
    this.service
      .GetById(this.service.serviceUrl, this.component.config.data)
      .subscribe((resp) => {
        this.component.request = resp.data;
      });
  }

  getFile(e: any, fileHandler: any) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.blob.UploadFile(fd).subscribe((resp: any) => {
        fileHandler(resp);
      });
    }
  }

  save() {
    if (this.component.config.data === 'create') {
      this.create();
    } else {
      this.update();
    }
  }

  private create() {
    delete this.component.request.id
    this.service
      .Create(this.service.serviceUrl, this.component.request)
      .subscribe((resp: any) => {
        if (resp.succeeded) {
          this.message.showSuccessMessage('Successfully created!');
          this.component.ref.close(true);
        }
      });
  }

  private update() {
    this.service
      .Update(this.service.serviceUrl, this.component.request)
      .subscribe((resp: any) => {
        if (resp.succeeded) {
          this.message.showSuccessMessage('Successfully updated!');
          this.component.ref.close(true);
        }
      });
  }
}
