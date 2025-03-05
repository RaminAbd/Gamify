import { inject, Injectable } from '@angular/core';
import { LevelUpsertComponent } from './level-upsert.component';
import { LevelsApiService } from '../../../../../../../../../../participant-home/shared/services/levels.api.service';
import { BlobService } from '../../../../../../../../../../../core/services/blob.service';

@Injectable({
  providedIn: 'root',
})
export class LevelUpsertService {
  component: LevelUpsertComponent;
  private service: LevelsApiService = inject(LevelsApiService);
  private blob = inject(BlobService);
  constructor() {}

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
    if (this.isValid()) {
      if (this.component.request.id) {
        this.update();
      } else {
        this.create();
      }
    }
    else{
      this.component.message.showWarningMessage('Field are not valid!');
    }
  }

  private isValid() {
    let result = true;
    if (
      !this.component.request.name ||
      !this.component.request.type ||
      !this.component.request.toPoints ||
      !this.component.request.fromPoints ||
      !this.component.request.image.fileUrl
    )
      result = false;
    return result;
  }

  private create() {
    this.service
      .Create(this.service.serviceUrl, this.component.request)
      .subscribe((resp) => {
        if (resp.succeeded) {
          this.component.ref.close(true);
        }
      });
  }

  private update() {
    this.service
      .Update(this.service.serviceUrl, this.component.request)
      .subscribe((resp) => {
        if (resp.succeeded) {
          this.component.ref.close(true);
        }
      });
  }
}
